import Head from "next/head";
import { Component } from "react";

export default class Home extends Component {
    render() {
        return (
            <div className="container">
                <Head>
                    <title>Create Next App</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main className="flex flex-col flex-1 justify-center items-center py-20 px-0 text-black box-border">
                    <h1 className="m-0 text-6xl font-bold text-center box-border">
                        Welcome to{" "}
                        <a
                            href="https://nextjs.org"
                            className="text-blue-600 no-underline cursor-pointer box-border hover:underline focus:underline"
                        >
                            Next.js!
                        </a>
                    </h1>
                    <p className="mt-2 text-2xl leading-normal text-center box-border">
                        Get started by editing{" "}
                        <code className="p-3 font-mono text-lg leading-7 bg-gray-100 rounded-lg box-border">
                            pages/index.js{" "}
                        </code>
                    </p>
                    <div className="flex flex-wrap justify-center items-center mt-12 box-border">
                        <a
                            target="_blank"
                            href="/posts"
                            className="w-1/2 p-6 m-4 text-left no-underline border border-gray-300 border-solid cursor-pointer box-border hover:border-blue-600 hover:text-blue-600 focus:border-blue-600 focus:text-blue-600 rounded-lg"
                        >
                            <h3 className="mx-0 mt-0 mb-4 text-2xl font-bold box-border">Posts →</h3>
                            <p className="m-0 text-xl leading-normal box-border">
                                Fetches posts from https://jsonplaceholder.typicode.com/posts.
                            </p>
                        </a>
                        <a
                            target="_blank"
                            href="https://nextjs.org/docs"
                            className="w-1/2 p-6 m-4 text-left no-underline border border-gray-300 border-solid cursor-pointer box-border hover:border-blue-600 hover:text-blue-600 focus:border-blue-600 focus:text-blue-600 rounded-lg" rel="noreferrer"
                        >
                            <h3 className="mx-0 mt-0 mb-4 text-2xl font-bold box-border">Documentation →</h3>
                            <p className="m-0 text-xl leading-normal box-border">
                                Find in-depth information about Next.js features and API.
                            </p>
                        </a>
                        <a
                            target="_blank"
                            href="https://nextjs.org/learn"
                            className="w-1/2 p-6 m-4 text-left no-underline border border-gray-300 border-solid cursor-pointer box-border hover:border-blue-600 hover:text-blue-600 focus:border-blue-600 focus:text-blue-600 rounded-lg" rel="noreferrer"
                        >
                            <h3 className="mx-0 mt-0 mb-4 text-2xl font-bold box-border">Learn →</h3>
                            <p className="m-0 text-xl leading-normal box-border">
                                Learn about Next.js in an interactive course with quizzes!
                            </p>
                        </a>
                        <a
                            target="_blank"
                            href="https://github.com/vercel/next.js/tree/master/examples"
                            className="w-1/2 p-6 m-4 text-left no-underline border border-gray-300 border-solid cursor-pointer box-border hover:border-blue-600 hover:text-blue-600 focus:border-blue-600 focus:text-blue-600 rounded-lg" rel="noreferrer"
                        >
                            <h3 className="mx-0 mt-0 mb-4 text-2xl font-bold box-border">Examples →</h3>
                            <p className="m-0 text-xl leading-normal box-border">
                                Discover and deploy boilerplate example Next.js projects.
                            </p>
                        </a>
                        <a
                            target="_blank"
                            href="https://vercel.com/import?filter=next.js&amp;utm_source=create-next-app&amp;utm_medium=default-template&amp;utm_campaign=create-next-app"
                            className="w-1/2 p-6 m-4 text-left no-underline border border-gray-300 border-solid cursor-pointer box-border hover:border-blue-600 hover:text-blue-600 focus:border-blue-600 focus:text-blue-600 rounded-lg" rel="noreferrer"
                        >
                            <h3 className="mx-0 mt-0 mb-4 text-2xl font-bold box-border">Deploy →</h3>
                            <p className="m-0 text-xl leading-normal box-border">
                                Instantly deploy your Next.js site to a public URL with Vercel.
                            </p>
                        </a>
                    </div>
                </main>
            </div>
        );
    }
}
