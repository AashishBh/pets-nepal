import React, { Component, Suspense } from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user-actions";

import { auth, getUserProfileData } from "./firebase/firebase.utils";

import SignIn from "./components/signin/signin.component";
import SignUp from "./components/signup/signup.component";
import Header from "./components/header/header.component";
import Footer from "./components/footer/footer";

import Menu from "./shop/component/menu";
import ProductDetail from "./shop/component/product-detail";
import Category from "./shop/container/category";
import Subcategory from "./shop/container/subcategory";
import Checkout from "./shop/component/checkout/checkout";

import PetHospitals from "./others/pet-hospitals";
import PetBreeding from "./others/breeding";
import UserProfile from "./components/userprofile/userprofile";
import NotLoggedIn from "./components/userprofile/notloggedin";

import Homepage from "./home/container/homepage";

import Adoption from "./adoption/container/page";

import Blog from "./blog/container/blog/blog.component";
import BlogDetail from "./blog/component/blogdetail/blogdetail.component";

import Forum from "./forum/container/forum/page";
import QuestionDetail from "./forum/components/qndetail/qndetail";

import AdminPage from "./admin/container/adminpage";
import OrdersList from "./admin/component/orderslist";
import AddProducts from "./admin/component/addproducts";

const AddPet = React.lazy(() => import("./adoption/components/add"));
const AddBlog = React.lazy(() =>
  import("./blog/component/addblog/addblog.component")
);
const AskQns = React.lazy(() => import("./forum/components/askqn/askqn"));

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
          <Route
            exact
            path="/admin"
            render={() =>
              this.props.currentUser && this.props.currentUser.isAdmin ? (
                <AdminPage />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            path="/admin/addproducts"
            render={() =>
              this.props.currentUser && this.props.currentUser.isAdmin ? (
                <AddProducts />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            path="/admin/orders"
            render={() =>
              this.props.currentUser && this.props.currentUser.isAdmin ? (
                <OrdersList />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route exact path="/shop" component={Menu} />
          <Route exact path="/shop/:id" component={Category} />
          <Route
            exact
            path="/shop/:routeUrl/:routeName"
            component={Subcategory}
          />
          <Route
            exact
            path="/product/:routeUrl/:routeName/:id"
            component={ProductDetail}
          />
          <Route exact path="/checkout" component={Checkout} />
          <Route exact path="/" component={Homepage} />
          <Route exact path="/hospitals" component={PetHospitals} />
          <Route exact path="/breeding" component={PetBreeding} />
          <Route
            exact
            path="/profile"
            render={() =>
              this.props.currentUser ? <UserProfile /> : <NotLoggedIn />
            }
          />
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
          <Route exact path="/adoption" component={Adoption} />
          <Route
            exact
            path="/adoption/add"
            render={() => (
              <Suspense fallback=<div>Loading...</div>>
                <AddPet />
              </Suspense>
            )}
          />
          <Route exact path="/forum" component={Forum} />
          <Route exact path="/forum/:id" component={QuestionDetail} />
          <Route
            exact
            path="/ask/question"
            render={() => (
              <Suspense fallback=<div>Loading...</div>>
                <AskQns />
              </Suspense>
            )}
          />
        </Switch>
        <Suspense fallback=<div>Loading...</div>>
        <Footer/>
        </Suspense>
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
