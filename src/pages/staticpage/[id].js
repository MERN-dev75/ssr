import React from "react";

export default function client({ user }) {
  return (
    <>
      <div>Client side render</div>
      <div>
        {/* {user.map((item) => ( */}
          <h1>{user.name}</h1>
        {/* ))} */}
      </div>
    </>
  );
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const posts = await res.json();

  // Get the paths we want to prerender based on posts
  // In production environments, prerender all pages
  // (slower builds, but faster initial page load)
  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  // { fallback: false } means other routes should 404
  return { paths, fallback: false };
}

///////////////////////////////////////////////////////////////

export async function getStaticProps({ params }) {
  // Fetch data for a single user based on `id`
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${params.id}`
  );
  const user = await res.json();

  return {
    props: {
      user, // Pass user data to the page component
    },
  };
}
