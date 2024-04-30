import { Routes } from '@angular/router';
import { userLoggedGuard } from './application/guards/user-logged.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./infraestructure/views/login/login.component').then(m => m.LoginComponent),
        canActivate: [
            userLoggedGuard
        ]
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./infraestructure/views/dashboard/dashboard.component').then(m => m.DashboardComponent),
        children: [
            {
                path: 'registrar-orden',
                loadComponent: () => import('./infraestructure/views/register-order/register-order.component').then(m => m.RegisterOrderComponent)
            },
            {
                path: 'listar-ordenes',
                loadComponent: () => import('./infraestructure/views/list-order/list-order.component').then(m => m.ListOrderComponent)
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];
