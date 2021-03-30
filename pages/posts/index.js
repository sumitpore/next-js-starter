import PropTypes from "prop-types";
import { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { postsActions } from "../../redux/slices/posts";

const propTypes = {
    postsReducerProps: PropTypes.shape({
        foundPosts: PropTypes.array,
        foundPostsError: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
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
    componentDidMount() {
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

    render() {
        const { foundPosts, foundPostsError } = this.props.postsReducerProps;

        if (this.shouldDisplayLoadingText()) return <div className="loading">Loading...</div>;

        if (foundPostsError) return <div className="errors">Error loading posts: {foundPostsError}</div>;

        if (foundPosts.length === 0) return <div>No posts yet!</div>;

        return (
            <div className="posts">
                {foundPosts.map((post) => (
                    <article className="mb-2" key={post.id}>
                        <h2>{post.title}</h2>
                        <div>{post.body}</div>
                    </article>
                ))}
            </div>
        );
    }
}

Posts.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
