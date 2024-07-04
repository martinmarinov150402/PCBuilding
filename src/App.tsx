import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { ConfigurationPage } from "./ConfigurationPage"
import { MainPage } from "./MainPage"
import { getConfigurations, loadConfiguration } from "./services/httpService"
import Layout from "./layout"
import { ConfigurationsPage } from "./ConfigurationsPage"
import RegistrationPage from "./RegistrationPage"
import CreateConfigurationPage from "./CreateConfigurationPage"
import PartsPage from "./PartsPage"
import CreatePartPage from "./CreatePartPage"

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
                path: "/parts",
                element: <PartsPage/>
            },
            {
                path: "/register",
                element: <RegistrationPage/>
            },
            {
                path: "/parts/create",
                element: <CreatePartPage/>
            }
        ],
    }
  ])
  return (
    <RouterProvider router={router}/>
  )
}

export default App;