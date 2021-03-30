import PropTypes from "prop-types";
import { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { postsActions } from "../../redux/slices/posts";

const propTypes = {
    postsReducerProps: PropTypes.shape({
        foundPosts: PropTypes.array,
        foundPostsError: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]),
    }).isRequired,

    postsReducerActions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    postsReducerProps: {
        foundPosts: state.postsReducer.foundPosts,
        foundPostsError: state.postsReducer.foundPostsError,
    },
});

const mapDispatchToProps = (dispatch) => ({
    postsReducerActions: bindActionCreators(postsActions, dispatch),
});

export class Posts extends Component {
    constructor(props) {
        super(props);

        this.onClickLoadMoreBtn = this.onClickLoadMoreBtn.bind(this);
    }

    componentDidMount() {
        this.props.postsReducerActions.getPosts();
    }

    onClickLoadMoreBtn() {
        this.props.postsReducerActions.getPosts();
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

    render() {
        const { foundPosts, foundPostsError } = this.props.postsReducerProps;

        if (this.shouldDisplayLoadingText()) return <div className="loading">Loading...</div>;

        if (foundPostsError) return <div className="errors">Error loading posts: {foundPostsError}</div>;

        if (foundPosts.length === 0) return <div>No posts yet!</div>;

        return (
            <>
                <div className="posts">
                    {foundPosts.map((post) => (
                        <article className="mb-2" key={post.id}>
                            <h2>{post.title}</h2>
                            <div>{post.body}</div>
                        </article>
                    ))}
                </div>

                <button
                    type="button"
                    className="bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
                    onClick={this.onClickLoadMoreBtn}
                >
                    Load more <span className="hidden sm:inline">→</span>
                </button>
            </>
        );
    }
}

Posts.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
