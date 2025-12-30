

import { buttonVariants } from "@/components/ui/button"
import {api} from "@/convex/_generated/api"
import {Id} from "@/convex/_generated/dataModel"
import {fetchQuery, preloadQuery} from "convex/nextjs"
import {ArrowLeft} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import {Separator} from "@/components/ui/separator"
import CommentSection from "@/components/web/CommentSection"
import { Metadata } from 'next'
import PostPresence from '@/components/web/PostPresence'
import { getToken } from '@/lib/auth-server'
import { redirect } from 'next/navigation'

interface PropIdRouteProps {
	params: Promise<{
		postId: Id<"posts">
	}>
}

export async function generateMetadata({params}: PropIdRouteProps): Promise<Metadata> {
	const { postId } = await params
	const post = await fetchQuery(api.posts.getPostById, { postId: postId })
	
	if (!post) return {
		title:"No post was found...",
	}
	return {
		title: post.title,
		description: post.body,
	}
}

export default async function PostIdRoute({params}: PropIdRouteProps) {
	const { postId } = await params
	const token = await getToken()
	const [post,preloadedComments,userId] = await Promise.all([
		await fetchQuery(api.posts.getPostById, {postId: postId}),
	await preloadQuery(api.comments.getCommentsByPostId, {
		postId: postId,
	}),
		await fetchQuery(api.presence.getUserId, {}, { token })
	])

	if (!userId) {
		return redirect("/auth/log-in")
	}

	
	if (!post) {
		return (
			<div className="max-w-3xl mx-auto py-8 px-4 animate-in fade-in duration-500 relative">
				<Link href={"/blog"} className={buttonVariants({variant: "ghost"})}>
					<ArrowLeft className="size-4" />
					Back to blog
				</Link>
				<div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden shadow-sm">
					<h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-muted-foreground">
						No post was found...
					</h1>
				</div>
			</div>
		)
	}

	return (
		<div className="max-w-3xl mx-auto py-8 px-4 animate-in fade-in duration-500 relative">
			<Link
				href={"/blog"}
				className={buttonVariants({variant: "ghost", className: "pb-4"})}
			>
				<ArrowLeft className="size-4" />
				Back to blog
			</Link>
			<div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden shadow-sm">
				<Image
					src={
						post.imageUrl ??
						"https://plus.unsplash.com/premium_photo-1737119503128-8120c87383a5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					}
					fill
					alt={post.title}
					className="object-scale-down hover:scale-105 fade-in-40 border-2 border-neutral-50 rounded-2xl bg-[#071d29]"
				/>
			</div>
			<div className="space-y-4 flex flex-col">
				<h1 className="text-4xl font-bold tracking-tighter text-card-foreground">
					{post.title}
				</h1>
				<div className="flex items-center gap-4">
					<p className="text-sm text-muted-foreground animate-accordion-down">
						Post created at {new Date(post._creationTime).toLocaleDateString("he-IL")}
					</p>
					{userId && <PostPresence roomId={post._id} userId={userId} />}
				</div>
			</div>
			<Separator className="my-8"></Separator>
			<div className="text-lg leading-relaxed text-foreground/90 whitespace-pre-wrap">
				<p>{post.body}</p>
			</div>
			<Separator className="my-8"></Separator>

			<CommentSection preloadedComments={preloadedComments} />
		</div>
	)
}
