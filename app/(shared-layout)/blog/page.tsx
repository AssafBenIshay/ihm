import {buttonVariants} from "@/components/ui/button"
import {Card, CardContent, CardFooter} from "@/components/ui/card"
import { Skeleton } from '@/components/ui/skeleton'
import {api} from "@/convex/_generated/api"
import {fetchQuery} from "convex/nextjs"
import { Metadata } from 'next'
import { cacheLife, cacheTag } from 'next/cache'
import Image from "next/image"
import Link from "next/link"
import { connection } from 'next/server'
import { Suspense } from 'react'

// export const dynamic = 'force-static'
// export const revalidate = 30

export const  metadata:Metadata = {
	title: "Assaf's Blog",
	description: "Assaf's blog",
}

export default function BlogPage() {
	return (
		<div className="py-12">
			<div className="text-center pb-12">
				<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Our Blog</h1>
				<p className="pt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
					Insights thought and trends from our team!
				</p>
			</div>
			<Suspense
				fallback={<SkeletonLoadingUI />}>
			<LoadBlogList /></Suspense>
		</div>
	)
}

async function LoadBlogList() {
	"use cache"
	cacheLife('hours')
	cacheTag('blog')
	await new Promise((resolve) => setTimeout(resolve, 200))
	const data = await fetchQuery(api.posts.getPosts)

	return (
		<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{data.map((post) => (
				<Card key={post._id} className="pt-0 overflow-hidden">
					<div className="relative h-48 w-full overflow-hidden">
						<Image
							src={
								post.imageUrl ??
								"https://plus.unsplash.com/premium_photo-1737119503128-8120c87383a5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							}
							alt="candles"
							fill
							className="rounded-t-lg object-cover"
						/>
					</div>
					<CardContent>
						<Link href={`blog/${post._id}`}>
							<h1 className="text-2xl font-bold hover:text-primary">{post.title}</h1>
						</Link>
						<p className="text-muted-foreground line-clamp-3">{post.body}</p>
					</CardContent>
					<CardFooter>
						<Link
							className={buttonVariants({
								className: "w-full",
							})}
							href={`/blog/${post._id}`}
						>
							{" "}
							Read more
						</Link>
					</CardFooter>
				</Card>
			))}
		</div>
	)
}

function SkeletonLoadingUI() {
	return (
		<div className="grid gap-6 md:grid-cols-3 lg:grid-cols-3">
			{[...Array(6)].map((_, i) => (
				<div key={i} className="flex flex-col space-y-3">
					<Skeleton className='h-48 w-full rounded-xl' />
					<div className="space-y-2 flex flex-col">
						<Skeleton className = 'h-6 w-3/4'></Skeleton>
						<Skeleton className = 'h-4 w-full'></Skeleton>
						<Skeleton className = 'h-4 w-2/4'></Skeleton>
					</div>
				</div>
			))}
		</div>
	)
}
// ("use client")

// import {buttonVariants} from "@/components/ui/button"
// import {Card, CardContent, CardFooter} from "@/components/ui/card"
// import {api} from "@/convex/_generated/api"
// import {useQuery} from "convex/react"
// import Image from "next/image"
// import Link from "next/link"

// export default function BlogPage() {
// 	const data = useQuery(api.posts.getPosts)
// 	return (
// 		<div className="py-12">
// 			<div className="text-center pb-12">
// 				<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Our Blog</h1>
// 				<p className="pt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
// 					Insights thought and trends from our team!
// 				</p>
// 			</div>

// 			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
// 				{data?.map((post) => (
// 					<Card key={post._id} className="pt-0 overflow-hidden">
// 						<div className="relative h-48 w-full overflow-hidden">
// 							<Image
// 								src="https://plus.unsplash.com/premium_photo-1737119503128-8120c87383a5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
// 								alt="candles"
// 								fill
// 								className="rounded-t-lg"
// 							/>
// 						</div>
// 						<CardContent>
// 							<Link href={`blog/${post._id}`}>
// 								<h1 className="text-2xl font-bold hover:text-primary">{post.title}</h1>
// 							</Link>
// 							<p className="text-muted-foreground line-clamp-3">{post.body}</p>
// 						</CardContent>
// 						<CardFooter>
// 							<Link
// 								className={buttonVariants({
// 									className: "w-full",
// 								})}
// 								href={`/blog/${post._id}`}
// 							>
// 								{" "}
// 								Read more
// 							</Link>
// 						</CardFooter>
// 					</Card>
// 				))}
// 			</div>
// 		</div>
// 	)
// }
