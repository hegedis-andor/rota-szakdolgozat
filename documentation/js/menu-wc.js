'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">ordering-app documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AdminModule.html" data-type="entity-link">AdminModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AdminModule-3f5004758c17542cf9b2bb4a7ed83b67"' : 'data-target="#xs-components-links-module-AdminModule-3f5004758c17542cf9b2bb4a7ed83b67"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AdminModule-3f5004758c17542cf9b2bb4a7ed83b67"' :
                                            'id="xs-components-links-module-AdminModule-3f5004758c17542cf9b2bb4a7ed83b67"' }>
                                            <li class="link">
                                                <a href="components/AccountComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AccountComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdminPageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdminPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdminSettingsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdminSettingsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AdminRoutingModule.html" data-type="entity-link">AdminRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AmountSelectorModule.html" data-type="entity-link">AmountSelectorModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AmountSelectorModule-8b6591d9b7260db44796abf28fa715c6"' : 'data-target="#xs-components-links-module-AmountSelectorModule-8b6591d9b7260db44796abf28fa715c6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AmountSelectorModule-8b6591d9b7260db44796abf28fa715c6"' :
                                            'id="xs-components-links-module-AmountSelectorModule-8b6591d9b7260db44796abf28fa715c6"' }>
                                            <li class="link">
                                                <a href="components/AmountSelectorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AmountSelectorComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-6eba736212fa78d12c693be358200dfd"' : 'data-target="#xs-components-links-module-AppModule-6eba736212fa78d12c693be358200dfd"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-6eba736212fa78d12c693be358200dfd"' :
                                            'id="xs-components-links-module-AppModule-6eba736212fa78d12c693be358200dfd"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link">AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AuthModule-dc02d277633fcb37ff01110715adeeef"' : 'data-target="#xs-components-links-module-AuthModule-dc02d277633fcb37ff01110715adeeef"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthModule-dc02d277633fcb37ff01110715adeeef"' :
                                            'id="xs-components-links-module-AuthModule-dc02d277633fcb37ff01110715adeeef"' }>
                                            <li class="link">
                                                <a href="components/AuthFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AuthFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RestaurantAuthComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RestaurantAuthComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserAuthComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserAuthComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-dc02d277633fcb37ff01110715adeeef"' : 'data-target="#xs-injectables-links-module-AuthModule-dc02d277633fcb37ff01110715adeeef"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-dc02d277633fcb37ff01110715adeeef"' :
                                        'id="xs-injectables-links-module-AuthModule-dc02d277633fcb37ff01110715adeeef"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthRoutingModule.html" data-type="entity-link">AuthRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthStoreModule.html" data-type="entity-link">AuthStoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ButtonOutlinedModule.html" data-type="entity-link">ButtonOutlinedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ButtonOutlinedModule-5de307a84402b1c7730ea1f38b064d27"' : 'data-target="#xs-components-links-module-ButtonOutlinedModule-5de307a84402b1c7730ea1f38b064d27"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ButtonOutlinedModule-5de307a84402b1c7730ea1f38b064d27"' :
                                            'id="xs-components-links-module-ButtonOutlinedModule-5de307a84402b1c7730ea1f38b064d27"' }>
                                            <li class="link">
                                                <a href="components/ButtonOutlinedComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ButtonOutlinedComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CheckoutModule.html" data-type="entity-link">CheckoutModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CheckoutModule-24d43dc63f39f3c91fe771ecb0556f7c"' : 'data-target="#xs-components-links-module-CheckoutModule-24d43dc63f39f3c91fe771ecb0556f7c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CheckoutModule-24d43dc63f39f3c91fe771ecb0556f7c"' :
                                            'id="xs-components-links-module-CheckoutModule-24d43dc63f39f3c91fe771ecb0556f7c"' }>
                                            <li class="link">
                                                <a href="components/CheckoutComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CheckoutComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CheckoutRoutingModule.html" data-type="entity-link">CheckoutRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ChefModule.html" data-type="entity-link">ChefModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ChefModule-5a89821e2e9b8f1e1b297c2cc87ea742"' : 'data-target="#xs-components-links-module-ChefModule-5a89821e2e9b8f1e1b297c2cc87ea742"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ChefModule-5a89821e2e9b8f1e1b297c2cc87ea742"' :
                                            'id="xs-components-links-module-ChefModule-5a89821e2e9b8f1e1b297c2cc87ea742"' }>
                                            <li class="link">
                                                <a href="components/ChefComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ChefComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrderListItemComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrderListItemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StatusModifierComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StatusModifierComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ChefModule-5a89821e2e9b8f1e1b297c2cc87ea742"' : 'data-target="#xs-injectables-links-module-ChefModule-5a89821e2e9b8f1e1b297c2cc87ea742"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ChefModule-5a89821e2e9b8f1e1b297c2cc87ea742"' :
                                        'id="xs-injectables-links-module-ChefModule-5a89821e2e9b8f1e1b297c2cc87ea742"' }>
                                        <li class="link">
                                            <a href="injectables/ChefService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ChefService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ChefRoutingModule.html" data-type="entity-link">ChefRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ChefStoreModule.html" data-type="entity-link">ChefStoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ConfirmationDialogModule.html" data-type="entity-link">ConfirmationDialogModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ConfirmationDialogModule-6bd0ae3d9331cc9a3b4750df66221336"' : 'data-target="#xs-components-links-module-ConfirmationDialogModule-6bd0ae3d9331cc9a3b4750df66221336"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ConfirmationDialogModule-6bd0ae3d9331cc9a3b4750df66221336"' :
                                            'id="xs-components-links-module-ConfirmationDialogModule-6bd0ae3d9331cc9a3b4750df66221336"' }>
                                            <li class="link">
                                                <a href="components/ConfirmationDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ConfirmationDialogComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link">CoreModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CoreModule-a26126eb99f2a62a3d121d56d2707390"' : 'data-target="#xs-components-links-module-CoreModule-a26126eb99f2a62a3d121d56d2707390"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CoreModule-a26126eb99f2a62a3d121d56d2707390"' :
                                            'id="xs-components-links-module-CoreModule-a26126eb99f2a62a3d121d56d2707390"' }>
                                            <li class="link">
                                                <a href="components/LoadResourcesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoadResourcesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SidenavComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SidenavComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CoreModule-a26126eb99f2a62a3d121d56d2707390"' : 'data-target="#xs-injectables-links-module-CoreModule-a26126eb99f2a62a3d121d56d2707390"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CoreModule-a26126eb99f2a62a3d121d56d2707390"' :
                                        'id="xs-injectables-links-module-CoreModule-a26126eb99f2a62a3d121d56d2707390"' }>
                                        <li class="link">
                                            <a href="injectables/NavigationService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>NavigationService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RestaurantService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>RestaurantService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DialogModule.html" data-type="entity-link">DialogModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-DialogModule-73c00780467d1f7e6272ffadf094e08e"' : 'data-target="#xs-injectables-links-module-DialogModule-73c00780467d1f7e6272ffadf094e08e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DialogModule-73c00780467d1f7e6272ffadf094e08e"' :
                                        'id="xs-injectables-links-module-DialogModule-73c00780467d1f7e6272ffadf094e08e"' }>
                                        <li class="link">
                                            <a href="injectables/DialogService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>DialogService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ExpansionPanelModule.html" data-type="entity-link">ExpansionPanelModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ExpansionPanelModule-751ecc32a18ca25b5901a133efca7e14"' : 'data-target="#xs-components-links-module-ExpansionPanelModule-751ecc32a18ca25b5901a133efca7e14"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ExpansionPanelModule-751ecc32a18ca25b5901a133efca7e14"' :
                                            'id="xs-components-links-module-ExpansionPanelModule-751ecc32a18ca25b5901a133efca7e14"' }>
                                            <li class="link">
                                                <a href="components/ExpansionPanelComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ExpansionPanelComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoadingIndicatorModule.html" data-type="entity-link">LoadingIndicatorModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LoadingIndicatorModule-e5182d94423bbac37b034eca39e10dab"' : 'data-target="#xs-components-links-module-LoadingIndicatorModule-e5182d94423bbac37b034eca39e10dab"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoadingIndicatorModule-e5182d94423bbac37b034eca39e10dab"' :
                                            'id="xs-components-links-module-LoadingIndicatorModule-e5182d94423bbac37b034eca39e10dab"' }>
                                            <li class="link">
                                                <a href="components/LoadingIndicatorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoadingIndicatorComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/OrderingModule.html" data-type="entity-link">OrderingModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-OrderingModule-66aa363504db603a4825f76f6365519e"' : 'data-target="#xs-components-links-module-OrderingModule-66aa363504db603a4825f76f6365519e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-OrderingModule-66aa363504db603a4825f76f6365519e"' :
                                            'id="xs-components-links-module-OrderingModule-66aa363504db603a4825f76f6365519e"' }>
                                            <li class="link">
                                                <a href="components/ProductCardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProductCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProductListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TableSelectorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TableSelectorComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-OrderingModule-66aa363504db603a4825f76f6365519e"' : 'data-target="#xs-injectables-links-module-OrderingModule-66aa363504db603a4825f76f6365519e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-OrderingModule-66aa363504db603a4825f76f6365519e"' :
                                        'id="xs-injectables-links-module-OrderingModule-66aa363504db603a4825f76f6365519e"' }>
                                        <li class="link">
                                            <a href="injectables/OrderingService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>OrderingService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OrderingRoutingModule.html" data-type="entity-link">OrderingRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/OrderingStoreModule.html" data-type="entity-link">OrderingStoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ProductPageModule.html" data-type="entity-link">ProductPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ProductPageModule-58d80b33bd69e76f0b6e7201c3939ff4"' : 'data-target="#xs-components-links-module-ProductPageModule-58d80b33bd69e76f0b6e7201c3939ff4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProductPageModule-58d80b33bd69e76f0b6e7201c3939ff4"' :
                                            'id="xs-components-links-module-ProductPageModule-58d80b33bd69e76f0b6e7201c3939ff4"' }>
                                            <li class="link">
                                                <a href="components/ProductPageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProductPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ResourceManagementModule.html" data-type="entity-link">ResourceManagementModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ResourceManagementModule-84c8c296a203d24d17e01085415b188a"' : 'data-target="#xs-components-links-module-ResourceManagementModule-84c8c296a203d24d17e01085415b188a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ResourceManagementModule-84c8c296a203d24d17e01085415b188a"' :
                                            'id="xs-components-links-module-ResourceManagementModule-84c8c296a203d24d17e01085415b188a"' }>
                                            <li class="link">
                                                <a href="components/GroupEditorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GroupEditorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModifyComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModifyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductEditorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProductEditorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TableEditorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TableEditorComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ResourceManagementModule-84c8c296a203d24d17e01085415b188a"' : 'data-target="#xs-injectables-links-module-ResourceManagementModule-84c8c296a203d24d17e01085415b188a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ResourceManagementModule-84c8c296a203d24d17e01085415b188a"' :
                                        'id="xs-injectables-links-module-ResourceManagementModule-84c8c296a203d24d17e01085415b188a"' }>
                                        <li class="link">
                                            <a href="injectables/ResourceManagementService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ResourceManagementService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ResourceManagementRoutingModule.html" data-type="entity-link">ResourceManagementRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ResourceManagementStoreModule.html" data-type="entity-link">ResourceManagementStoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/RestaurantStoreModule.html" data-type="entity-link">RestaurantStoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/RootStoreModule.html" data-type="entity-link">RootStoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SnackbarModule.html" data-type="entity-link">SnackbarModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SnackbarModule-53f65cbf2cbe2bbf8f5b92d8518f187c"' : 'data-target="#xs-components-links-module-SnackbarModule-53f65cbf2cbe2bbf8f5b92d8518f187c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SnackbarModule-53f65cbf2cbe2bbf8f5b92d8518f187c"' :
                                            'id="xs-components-links-module-SnackbarModule-53f65cbf2cbe2bbf8f5b92d8518f187c"' }>
                                            <li class="link">
                                                <a href="components/SnackbarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SnackbarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SnackbarModule-53f65cbf2cbe2bbf8f5b92d8518f187c"' : 'data-target="#xs-injectables-links-module-SnackbarModule-53f65cbf2cbe2bbf8f5b92d8518f187c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SnackbarModule-53f65cbf2cbe2bbf8f5b92d8518f187c"' :
                                        'id="xs-injectables-links-module-SnackbarModule-53f65cbf2cbe2bbf8f5b92d8518f187c"' }>
                                        <li class="link">
                                            <a href="injectables/SnackbarService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>SnackbarService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/StatusModifierComponent.html" data-type="entity-link">StatusModifierComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthStoreEffects.html" data-type="entity-link">AuthStoreEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ChefService.html" data-type="entity-link">ChefService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ChefStoreEffects.html" data-type="entity-link">ChefStoreEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DialogService.html" data-type="entity-link">DialogService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NavigationService.html" data-type="entity-link">NavigationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OrderingService.html" data-type="entity-link">OrderingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OrderingStoreEffects.html" data-type="entity-link">OrderingStoreEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OrderingStoreUtilsEffects.html" data-type="entity-link">OrderingStoreUtilsEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ResourceManagementService.html" data-type="entity-link">ResourceManagementService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ResourceManagementStoreEffects.html" data-type="entity-link">ResourceManagementStoreEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ResourceManagementUtilsStoreEffects.html" data-type="entity-link">ResourceManagementUtilsStoreEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RestaurantService.html" data-type="entity-link">RestaurantService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RestaurnatStoreAuthEffects.html" data-type="entity-link">RestaurnatStoreAuthEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RestaurnatStoreResourceEffects.html" data-type="entity-link">RestaurnatStoreResourceEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RestaurnatStoreSettingEffects.html" data-type="entity-link">RestaurnatStoreSettingEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SnackbarService.html" data-type="entity-link">SnackbarService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/RedirectIfFullyAuthenticated.html" data-type="entity-link">RedirectIfFullyAuthenticated</a>
                            </li>
                            <li class="link">
                                <a href="guards/ResourcesLoadedGuard.html" data-type="entity-link">ResourcesLoadedGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AppState.html" data-type="entity-link">AppState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AuthFormData.html" data-type="entity-link">AuthFormData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AuthState.html" data-type="entity-link">AuthState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Cart.html" data-type="entity-link">Cart</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CartItem.html" data-type="entity-link">CartItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ChefState.html" data-type="entity-link">ChefState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DialogConfig.html" data-type="entity-link">DialogConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FormControlData.html" data-type="entity-link">FormControlData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Group.html" data-type="entity-link">Group</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MainNavigation.html" data-type="entity-link">MainNavigation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NavigationItem.html" data-type="entity-link">NavigationItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Order.html" data-type="entity-link">Order</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrderingState.html" data-type="entity-link">OrderingState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OrderItem.html" data-type="entity-link">OrderItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Product.html" data-type="entity-link">Product</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResourceManagementState.html" data-type="entity-link">ResourceManagementState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RestaurantAuthResponse.html" data-type="entity-link">RestaurantAuthResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RestaurantCredentials.html" data-type="entity-link">RestaurantCredentials</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RestaurantState.html" data-type="entity-link">RestaurantState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SidenavData.html" data-type="entity-link">SidenavData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SnackbarConfig.html" data-type="entity-link">SnackbarConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SnackbarPosition.html" data-type="entity-link">SnackbarPosition</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Subgroup.html" data-type="entity-link">Subgroup</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SubNavigation.html" data-type="entity-link">SubNavigation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Table.html" data-type="entity-link">Table</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserCredentials.html" data-type="entity-link">UserCredentials</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});