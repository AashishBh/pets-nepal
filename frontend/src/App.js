import React, { Component, Suspense } from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user-actions";

import { auth, getUserProfileData } from "./firebase/firebase.utils";

import SignIn from "./components/signin/signin.component";
import SignUp from "./components/signup/signup.component";
import Header from "./components/header/header.component";

import Menu from "./shop/component/menu";
import ProductDetail from "./shop/component/product-detail"
import Category from "./shop/container/category";
import Checkout from "./shop/component/checkout/checkout";


import Blog from "./blog/container/blog/blog.component";
import BlogDetail from "./blog/component/blogdetail/blogdetail.component";
const AddBlog = React.lazy(() =>
  import("./blog/component/addblog/addblog.component")
);

class App extends Component {
  unsubscribeFromAuth = null;

  componentDidMount = () => {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await getUserProfileData(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }

      setCurrentUser(userAuth);
    });
  };

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <SignIn />
            }
          />
          <Route
            exact
            path="/signup"
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <SignUp />
            }
          />
          <Route exact path="/shop" component={Menu} />          
          <Route exact path="/shop/:id" component={Category} />
          <Route exact path="/product/:id" component={ProductDetail} />
          <Route exact path="/checkout" component={Checkout} />
          <Route exact path="/blog" component={Blog} />
          <Route exact path="/blog/:id" component={BlogDetail} />
          <Route
            exact
            path="/add/blog"
            render={() => (
              <Suspense fallback=<div>Loading...</div>>
                <AddBlog />
              </Suspense>
            )}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
