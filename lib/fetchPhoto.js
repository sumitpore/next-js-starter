import { PHOTOS_API } from "../constants/apis";

const fetchPhoto = async ({ photoId, failureReturnCallback }) => {
    const response = await fetch(`${PHOTOS_API}/${photoId}`);

    const data = await response.json();

    if (!response.ok) {
        // get error message from body or default to response statusText
        const error = (data && data.message) || response.statusText || response.status;

        if (typeof failureReturnCallback === "function") return failureReturnCallback(error);
    }

    return data;
};

export default fetchPhoto;
