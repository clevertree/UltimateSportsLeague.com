import React, {Component} from "react";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import MarkdownContent from "./components/markdown/MarkdownContent";
import NavWrapper from "./components/nav/NavWrapper";

/** CSS Styles **/
import './App.css';
import "./pages/site/site.css"

/** Page Sections **/
import HeaderSection from "./pages/site/header.md";
import FooterSection from "./pages/site/footer.md";
import NavSection from "./pages/site/nav.md";

/** Pages **/
import IndexPage from "./pages/index.md";
import AboutPage from "./pages/about.md";
import ContactPage from "./pages/contact.md";


class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <NavWrapper>
                    <MarkdownContent file={HeaderSection} options={{wrapper: 'header', forceWrapper: true}}/>
                    <MarkdownContent file={NavSection} options={{wrapper: 'nav', forceWrapper: true}}/>
                    <Switch>
                        {/** Add Route Paths Here **/}

                        <Route path='/home'><MarkdownContent file={IndexPage}/></Route>
                        <Route path='/about'><MarkdownContent file={AboutPage}/></Route>
                        <Route path='/contact'><MarkdownContent file={ContactPage}/></Route>
                        <Route exact path="/">
                            <Redirect to="/home"/>
                        </Route>
                    </Switch>
                    <MarkdownContent file={FooterSection} options={{wrapper: 'footer', forceWrapper: true}}/>
                </NavWrapper>
            </BrowserRouter>
        );
    }

}

export default App;

