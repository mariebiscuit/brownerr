import "@testing-library/jest-dom";
import { render, screen, act} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../src/App";
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from "@react-oauth/google";

describe("BasicTesting", () => {
  beforeEach(() => {
    window.HTMLElement.prototype.scrollIntoView = function() {};
    render( 
    <GoogleOAuthProvider clientId = "296281874095-j1kagpkpq2spn433j5bq2al44kgj2d0m.apps.googleusercontent.com">
    <BrowserRouter>
    <App/>
    </BrowserRouter>
    </GoogleOAuthProvider>);
  })

  /**
 * test whether all elements are loaded
 */
  test("loads and displays clickable buttons", async () => {
    expect(await screen.getByText('Student Talents')).toBeInTheDocument();
    expect(await screen.getByText('Organizers')).toBeInTheDocument();
    expect(await screen.getByText('Opportunities')).toBeInTheDocument();
    });

    /*** test whether all elements are loaded*/
  test("displays opportunities", async () => {
    let user = userEvent.setup();
    let submit = await screen.findByText("Opportunities");
    user.click(submit);
    // expect(await screen.getByText('Posted by')).toBeInTheDocument();
    });
});





