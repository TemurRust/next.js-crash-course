import { NextResponse } from "next/server";
interface Post {
   id: number;
   title: string;
   content: string;
   slug: string;
}
const posts: Post[] = [
   {
      id: 1,
      title: "Hello world",
      content: "Welcome to Next.js!",
      slug: "hello-world-1",
   },
   {
      id: 2,
      title: "Hello world 2",
      content: "Welcome to Next.js!",
      slug: "hello-world-2",
   },
   {
      id: 3,
      title: "Hello world 3",
      content: "Welcome to Next.js!",
      slug: "hello-world-3",
   },
   {
      id: 4,
      title: "Hello world 4",
      content: "Welcome to Next.js!",
      slug: "hello-world-4",
   },
];
// Handle GET requests
export async function GET() {
   // return JSON data
   return NextResponse.json(posts, { status: 200 });
}

// Handle POST requests
export async function POST(request: Request) {
   // return JSON data
   try {
      // parse the request body
      const body = await request.json();

      // create a new post
      const newPost: Post = {
         id: posts.length + 1,
         title: body.title,
         content: body.content,
         slug: body.slug,
      };
      posts.push(newPost);

      // return the new post
      return NextResponse.json(newPost, { status: 201 });
   } catch (error) {
      console.error(error);
      // return an error message
      return NextResponse.json(
         { error: "Invalid request body" },
         { status: 400 }
      );
   }
}
