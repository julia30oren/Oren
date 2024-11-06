import { NgModule, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { PolicyComponent } from './components/policy/policy.component';
import { TermsComponent } from './components/terms/terms.component';
import { BlogComponent } from './components/blog/blog.component';
import { PostComponent } from './components/post/post.component';

export const routes: Routes = [
    { path: '', component: AboutComponent },
    { path: 'about', component: AboutComponent },
    { path: 'blog', component: BlogComponent },
    { path: 'post/:postId', component: PostComponent },
    { path: 'policy', component: PolicyComponent },
    { path: 'terms', component: TermsComponent },
    {
        path: '**',
        loadComponent: () =>
            import('./components/unfound/unfound.component').then((c) => c.UnfoundComponent), // lazy load of component
    },  // Wildcard route for a 404 page
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { enableTracing: true, anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' })
    ],
    exports: [RouterModule]
})
export class RoutingModule implements OnInit {
    ngOnInit() { }
}