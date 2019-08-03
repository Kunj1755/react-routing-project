import React, { Component } from "react";
import axios from "../../axios";
import "./Blog.css";
import Posts from "./Posts/Posts";
import { Route, NavLink, Switch, Redirect } from "react-router-dom";
import NewPost from "./NewPost/NewPost";

class Blog extends Component {
  state = {
    auth: false
  }
  componentDidMount() {
    axios
      .get("/posts")
      .then(response => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map(post => {
          return {
            ...post,
            author: "Max"
          };
        });
        this.setState({ posts: updatedPosts });
        // console.log( response );
      })
      .catch(error => {
        // console.log(error);
        this.setState({ error: true });
      });
  }

  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink
                  to="/"
                  exact
                  activeClassName="my-active"
                  activeStyle={{
                    color: "#fa923f",
                    textDecoration: "underline"
                  }}
                >
                  Posts
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: "/new-post",
                    hash: "#submit", // To jump to any point
                    search: "?quick-submit=true" // Allows us to use query params
                  }}
                >
                  New Post
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        {/* <Route path="/" exact render={() => <h1>Home</h1>} />
        <Route path="/" render={() => <h1>Home 2</h1>} /> */}
        {/* this will load Posts component */}
        {/*  The below is a guard. An alternative to this would 
        be to go the guarded page and write auth condition in componentDidMount() */}
        <Switch>
          {this.state.auth ? <Route path="/new-post" component={NewPost} /> : null}
          <Route path="/posts" component={Posts} />
          {/* This will catch all the unknown routes.
          This will not work together with <Redirect>, if you rediret from="/" bcz 
          from="/" is treated as prefix therefore this catches all routes
          as does <Route render={() => <h1>not Found</h1>} />.  */}
          <Route render={() => <h1>not Found</h1>} />
          {/* <Redirect from="/" to="/posts"></Redirect> */}
        </Switch>
      </div>
    );
  }
}

export default Blog;
