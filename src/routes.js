import React from 'react';
import {Redirect} from 'react-router-dom';
import Index from './compoment/index'
import KubeComponent from "./compoment/kubernetes";
import NignxComponent from "./compoment/format";

const routes = [
    {
        path: '/',
        exact: true,
        component: () => <Redirect to="/Nginx"/>
    },
    {
        route: '*',
        component: Index,
        routes: [
            {
                path: "/Kube",
                exact: true,
                component: KubeComponent,
            },
            {
                path: "/Nginx",
                exact: true,
                component: NignxComponent,
            }
        ]
    }
];

export default routes;
