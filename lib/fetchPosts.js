import { POST_API } from "../constants/apis";

const fetchPosts = async ({ pageNo, failureReturnCallback }) => {
    const response = await fetch(`${POST_API}/?_page=${pageNo}`);

    const data = await response.json();

    if (!response.ok) {
        // get error message from body or default to response statusText
        const error = (data && data.message) || response.statusText || response.status;

        if (typeof failureReturnCallback === "function") return failureReturnCallback(error);
    }

    return data;
};

export default fetchPosts;
