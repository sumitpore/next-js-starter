import { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { postsActions } from "../../redux/slices/posts";

const mapStateToProps = (state) => ({
        foundPosts: state.postsReducer.foundPosts,
        foundPostsError: state.postsReducer.foundPostsError,
    });

const mapDispatchToProps = (dispatch) => ({
        actions: bindActionCreators(postsActions, dispatch),
    });

export class Posts extends Component {
    componentDidMount() {
        this.props.actions.getPosts();
    }

    shouldDisplayLoadingText() {
        if (this.props.foundPosts.length > 0) {
            return false;
        }

        if (this.props.foundPostsError) {
            return false;
        }

        return true;
    }

    render() {
        const { foundPosts, foundPostsError } = this.props;

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

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
