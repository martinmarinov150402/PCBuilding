import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { ConfigurationPage } from "./ConfigurationPage"
import { MainPage } from "./MainPage"
import { getConfigurations, loadConfiguration } from "./services/httpService"
import Layout from "./layout"
import { ConfigurationsPage } from "./ConfigurationsPage"

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
        ],
    }
  ])
  return (
    <RouterProvider router={router}/>
  )
}

export default App;