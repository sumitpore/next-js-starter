/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/no-array-index-key */
import PropTypes from "prop-types";
import { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Modal from "../../../components/modal";
import { POST_API } from "../../../constants/apis";
import { initialState, postsActions } from "../../../redux/slices/examples/posts";

const propTypes = {
    postsReducerProps: PropTypes.shape({
        foundPosts: PropTypes.array,
        foundPostsError: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]),
        postDetails: PropTypes.object,
    }).isRequired,

    postsReducerActions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    postsReducerProps: {
        foundPosts: state.postsReducer.foundPosts,
        foundPostsError: state.postsReducer.foundPostsError,
        postDetails: state.postsReducer.postDetails,
    },
});

const mapDispatchToProps = (dispatch) => ({
    postsReducerActions: bindActionCreators(postsActions, dispatch),
});

export class Posts extends Component {
    state = { displayPostDetailsModal: false };

    constructor(props) {
        super(props);
        this.onLoadMoreBtnClick = this.onLoadMoreBtnClick.bind(this);
        this.onSinglePostClick = this.onSinglePostClick.bind(this);
        this.onPostDetailsModalCloseBtnClick = this.onPostDetailsModalCloseBtnClick.bind(this);
    }

    // `componentDidMount` is not needed because we are declaring `getStaticProps`
    // function in this file which will prepare the first page during build process.
    // If you remove getStaticProps, then uncomment below line.
    // componentDidMount() {
    //     this.props.postsReducerActions.getPosts();
    // }

    onLoadMoreBtnClick() {
        this.props.postsReducerActions.getPosts();
    }

    onSinglePostClick(postId, pageNo) {
        this.props.postsReducerActions.getPost({ postId, pageNo });
        this.setState({
            displayPostDetailsModal: true,
        });
    }

    onPostDetailsModalCloseBtnClick() {
        this.setState((prevState) => ({ displayPostDetailsModal: !prevState.displayPostDetailsModal }));
    }

    shouldDisplayLoadingText() {
        if (this.props.postsReducerProps.foundPosts.length > 0) {
            return false;
        }

        if (this.props.postsReducerProps.foundPostsError) {
            return false;
        }

        return true;
    }

    shouldDisplayLoadMoreBtn() {
        return this.props.postsReducerProps.foundPosts.length === 10;
    }

    renderPost(post, pageNo) {
        return (
            <div
                role="link"
                tabIndex={post.id}
                className="p-4 md:w-1/3 cursor-pointer"
                key={post.id}
                onClick={() => this.onSinglePostClick(post.id, pageNo)}
                onKeyUp={(e) => (e.key === "Enter" ? this.onSinglePostClick(post.id, pageNo) : "")}
            >
                <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                    <img
                        className="lg:h-48 md:h-36 w-full object-cover object-center"
                        src={`https://picsum.photos/id/${post.id}/720/400`}
                        alt={post.title}
                    />

                    <article className="p-6" key={post.id}>
                        <h2 className="title-font text-lg font-medium text-gray-900 mb-3">{post.title}</h2>
                        <div className="leading-relaxed mb-3">{post.body}</div>
                    </article>
                </div>
            </div>
        );
    }

    renderPostDetailsModal(postDetails) {
        return (
            <Modal
                showModal
                onCloseBtnClick={this.onPostDetailsModalCloseBtnClick}
                title={postDetails.title}
                description={postDetails.body}
            />
        );
    }

    render() {
        const { foundPosts, foundPostsError, postDetails } = this.props.postsReducerProps;
        const { displayPostDetailsModal } = this.state;

        if (this.shouldDisplayLoadingText()) return <div className="loading">Loading...</div>;

        if (foundPostsError) return <div className="errors">Error loading posts: {foundPostsError}</div>;

        if (foundPosts.length === 0) return <div>No posts found!</div>;

        return (
            <div>
                {displayPostDetailsModal ? this.renderPostDetailsModal(postDetails) : <></>}

                <div className="posts">
                    {foundPosts.map((posts, index) => (
                        <div className="container px-5 py-24 mx-auto" key={index + 1}>
                            <h2 className="text-center mx-0 mt-2 mb-5 font-sans text-4xl font-semibold leading-10 text-gray-700">
                                Page {index + 1}
                            </h2>
                            <div className="mb-2 flex flex-wrap -m-4">
                                {posts.map((post) => this.renderPost(post, index))}
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    type="button"
                    className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mb-2"
                    onClick={this.onLoadMoreBtnClick}
                >
                    Load more <span className="hidden sm:inline">→</span>
                </button>
            </div>
        );
    }
}

Posts.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Posts);

// This method gets executed at build time.
export async function getStaticProps() {
    let postsReducerPros = initialState;
    const response = await fetch(`${POST_API}/?_page=1`);

    const data = await response.json();

    if (!response.ok) {
        return postsReducerPros;
    }

    postsReducerPros = {
        ...postsReducerPros,
        foundPosts: [data],
        nextPage: 2,
    };

    // We will fetch the results of first page during build process and return
    // that state. This improves first loading time significantly.
    return {
        props: {
            initialReduxState: {
                postsReducer: postsReducerPros,
            },
        },
    };
}
