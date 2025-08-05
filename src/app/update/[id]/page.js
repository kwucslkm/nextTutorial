"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Update() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:9999/topics/${id}`)
      .then(res => res.json())
      .then(result => {
        setTitle(result.title);
        setBody(result.body);
      });
  }, [id]);

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, body })
      };
      fetch(`http://localhost:9999/topics/${id}`, options)
        .then(res => res.json())
        .then(result => {
          setTitle(result.title);
          setBody(result.body);
          router.push(`/read/${id}`);
          router.refresh();
        });
    }}>
      <p>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </p>
      <p>
        <textarea
          name="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
      </p>
      <p>
        <input type="submit" value="update" />
      </p>
    </form>
  );
}
