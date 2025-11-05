"use client"

import { messageSchema } from "@/schemas/messageSchema"
import { ApiResponse } from "@/types/ApiResponse"
import { zodResolver } from "@hookform/resolvers/zod"
import axios, { AxiosError } from "axios"
import { useParams } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Send, Shuffle } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

const SendMessages = () => {
  const { username } = useParams<{ username: string }>()
  const [isLoading, setIsLoading] = useState(false)
  const [isRandomizing, setIsRandomizing] = useState(false)

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: ''
    }
  })

  const handleSendMessage = async (data: z.infer<typeof messageSchema>) => {
    setIsLoading(true)
    try {
      const response = await axios.post<ApiResponse>('api/send-message', {
        username,
        content: data.content
      })

      if (response.data.success) {
        toast.success("Message sent successfully")
        form.reset()
      } else {
        toast.error("Error in sending message")
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast.error(axiosError.response?.data?.message || "Failed to send message")
    } finally {
      setIsLoading(false)
    }
  }

  const [suggestedMessages, setSuggestedMessages] = useState<string[]>([
    "What's your favorite movie of all time?",
    "Do you have any hidden talents?",
    "What's the best advice you've ever received?",
    "If you could have dinner with anyone, who would it be?",
    "What's your biggest dream or aspiration?"
  ])

  const handleSuggestedMessage = (content: string) => {
    form.setValue('content', content)
  }

  const handleRandomize = async () => {
    setIsRandomizing(true)
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { id: crypto.randomUUID(), role: "user", content: "Generate questions" },
          ],
        }),
      })

      if (!res.ok || !res.body) throw new Error("AI response failed")

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
      }

      // data: What's your hobby?||What's your dream job?||...
      const match = buffer.match(/data:\s*(.+)/g)
      if (!match || match.length === 0) throw new Error("No valid data in stream")

      // Extracting the last "data:" line
      const lastData = match[match.length - 1].replace(/^data:\s*/, "")
      const aiSuggestions = lastData
        .split("||")
        .map((q) => q.trim())
        .filter(Boolean)

      if (aiSuggestions.length > 0) {
        setSuggestedMessages(aiSuggestions)
        toast.success("New AI-generated suggestions added!")
      } else {
        throw new Error("No valid AI suggestions")
      }
    } catch (error) {
      console.error("AI fetch failed:", error)
      toast.error("Failed to fetch new suggestions, shuffling existing ones instead.")
      setSuggestedMessages((prev) => [...prev].sort(() => Math.random() - 0.5))
    } finally {
      setIsRandomizing(false)
    }
  }


  return (
    <div className="container mx-auto my-8 p-6 bg-white rounded max-w-4xl">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Public Profile Link
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSendMessage)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Send Mystery Message to @{username}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write your anonymous message here..."
                        className="resize-none"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  {form.watch("content")?.length || 0}/300 characters
                </span>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send message
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Suggested Messages</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRandomize}
            disabled={isRandomizing}
            className="flex items-center gap-2"
          >
            {isRandomizing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Shuffle className="h-4 w-4" />
                Randomize
              </>
            )}
          </Button>
        </div>

        <div className="grid gap-2">
          {suggestedMessages.map((message, index) => (
            <Card
              key={index}
              onClick={() => handleSuggestedMessage(message)}
              className="cursor-pointer transition-colors hover:bg-muted/50"
            >
              <CardContent className="p-4">
                <p className="text-sm">{message}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-muted-foreground">
          Want to create your own Anonymous Message board?{" "}
          <Link href="/sign-up" className="text-blue-600 hover:text-blue-800 hover:underline">
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SendMessages
