import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { ConfigurationPage } from "./ConfigurationPage"
import { MainPage } from "./MainPage"
import { getConfigurations, loadConfiguration } from "./services/httpService"
import Layout from "./layout"
import { ConfigurationsPage } from "./ConfigurationsPage"
import RegistrationPage from "./RegistrationPage"
import CreateConfigurationPage from "./CreateConfigurationPage"

function App() {
    const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            { index: true, element: <MainPage /> },
            {
                path: "/configurations",
                loader: getConfigurations,
                element: <ConfigurationsPage/>,
            },
            {
                path: "/configurations/:configurationId/*",
                loader: loadConfiguration,
                element: <ConfigurationPage/>
            },
            {
                path: "/configurations/create",
                element: <CreateConfigurationPage></CreateConfigurationPage>
            },
            {
                path: "/register",
                element: <RegistrationPage/>
            }
        ],
    }
  ])
  return (
    <RouterProvider router={router}/>
  )
}

export default App;