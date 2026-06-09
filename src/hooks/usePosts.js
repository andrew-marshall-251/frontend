import { useEffect, useState } from "react";
import { fallbackPosts, normalizePosts } from "../lib/posts";

export function usePosts(endpoint, options = {}) {
  const { fallback = fallbackPosts } = options;
  const [posts, setPosts] = useState(fallback);
  const [loading, setLoading] = useState(Boolean(endpoint));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!endpoint) {
      setPosts(fallback);
      setLoading(false);
      setError(null);
      return;
    }

    let ignore = false;

    async function loadPosts() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error("Posts request failed");
        }

        const payload = await response.json();

        if (!ignore) {
          setPosts(normalizePosts(payload));
        }
      } catch (requestError) {
        if (!ignore) {
          setPosts(fallback);
          setError(requestError);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadPosts();

    return () => {
      ignore = true;
    };
  }, [endpoint, fallback]);

  return { posts, loading, error };
}
