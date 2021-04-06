/* eslint-disable eslint-comments/disable-enable-pair */
import PropTypes from "prop-types";
import { PureComponent } from "react";

import { API_ERROR_OCCURRED } from "../../../constants/errors";
import fetchPhoto from "../../../lib/fetchPhoto";

const propTypes = {
    photoId: PropTypes.number.isRequired,
    isError: PropTypes.bool.isRequired,
    photo: PropTypes.object.isRequired,
};

export class Photo extends PureComponent {
    render() {
        if (this.props.isError) return API_ERROR_OCCURRED;

        return (
            <>
                <pre>{JSON.stringify(this.props.photo, null, 4)}</pre>
                <br />
                <a
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    href={`/examples/photos/${this.props.photoId + 1}`}
                >
                    Next Photo
                </a>
            </>
        );
    }
}

Photo.propTypes = propTypes;

export default Photo;

// getStaticPaths is required for dynamic SSG pages
export async function getStaticPaths() {
    return {
        paths: [],
        fallback: "blocking", // passing blocking, so that nextjs generates SSG for any incoming id which is not returned by getStaticPaths
    };
}

export async function getStaticProps({ params }) {
    const data = await fetchPhoto({ photoId: params.photoId, failureReturnCallback: () => API_ERROR_OCCURRED });

    return {
        props: {
            photoId: parseInt(params.photoId, 10),
            isError: data === API_ERROR_OCCURRED,
            photo: data === API_ERROR_OCCURRED ? {} : data,
        },
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every second
        revalidate: data === API_ERROR_OCCURRED ? 1 : 300, // In seconds
    };
}
