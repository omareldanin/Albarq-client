import { Loader } from "@mantine/core";
import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import PrivateRoutes from "./components/PrivateWrappers";
import { RolesRoute } from "./components/RolesRoute";
import { useValidateToken } from "./hooks/useValidateToken";
import { AddBranch } from "./screens/AddBranch";
import { AddClient } from "./screens/AddClient";
import { AddEmployee } from "./screens/AddEmployee";
import { AddLocation } from "./screens/AddLocation";
import { AddOrder } from "./screens/AddOrder";
import { AddProduct } from "./screens/AddProduct";
import { AddRepositoryScreen } from "./screens/AddRepository";
import { AddStore } from "./screens/AddStore";
import { AddTenant } from "./screens/AddTenant";
import { Banners } from "./screens/Banners";
import { BranchesScreen } from "./screens/Branches";
import { Categories } from "./screens/Categories";
import { ClientsScreen } from "./screens/Clients";
import { Colors } from "./screens/Colors/inedx";
import { ConfirmClientOrders } from "./screens/ConfirmClientOrders";
import { CreateBulkOrders } from "./screens/CreateBulkOrders";
import { DeletedScreen } from "./screens/DeletedItems";
import { DeliveryAgentsManifest } from "./screens/DeliveryAgentsManifest";
import { EditBranch } from "./screens/EditBranch";
import { EditClient } from "./screens/EditClient";
import { EditEmployee } from "./screens/EditEmployee";
import { EditLocation } from "./screens/EditLocation";
import { EditOrder } from "./screens/EditOrder";
import { EditProductScreen } from "./screens/EditProduct";
import { EditRepositoryScreen } from "./screens/EditRepository";
import EditStore from "./screens/EditStore";
import { EditTenant } from "./screens/EditTenant";
import { Employees } from "./screens/Employees";
import { ForwardedOrders } from "./screens/ForwardedOrders";
import { ForwardedOrdersToCompany } from "./screens/ForwardedOrdersToCompany";
import { Home } from "./screens/Home";
import { LocationsScreen } from "./screens/Locations";
import { LoginScreen } from "./screens/Login";
import { OrdersScreen } from "./screens/Orders";
import { OrdersAutoUpdate } from "./screens/OrdersAutoUpdate";
import { OrdersSheet } from "./screens/OrdersSheet";
import { ProductScreen } from "./screens/ProductDetails";
import { Products } from "./screens/Products";
import { ReportsScreen } from "./screens/Reports";
import { RepositoriesScreen } from "./screens/Repositories";
import { RepositoryEntries } from "./screens/RepositoryEntries";
import { ShowBranch } from "./screens/ShowBranch";
import { ShowClient } from "./screens/ShowClients";
import { ShowEmployee } from "./screens/ShowEmployee";
import { ShowLocation } from "./screens/ShowLocation";
import { ShowOrder } from "./screens/ShowOrder";
import { ShowRepository } from "./screens/ShowRepository";
import { StoreScreen } from "./screens/ShowStore";
import { ShowTenant } from "./screens/ShowTenant";
import { Sizes } from "./screens/Sizes";
import { Stores } from "./screens/Stores";
import { TenantsScreen } from "./screens/Tenants";
import { TreasuryScreen } from "./screens/Treasury";
import { UsersLoginHistory } from "./screens/UsersLoginHistory";
import { useAuth } from "./store/authStore";

function App() {
    const navigate = useNavigate();
    const location = useLocation();
    const { role } = useAuth();

    const { isLoading, isSuccess } = useValidateToken();
    const token = localStorage.getItem("token");

    const isBaseRoute = location.pathname === "/";

    useEffect(() => {
        if (isSuccess) {
            const navigateTo = isBaseRoute ? "/orders" : location.pathname;
            navigate(navigateTo || "/orders");
        }
    }, [isSuccess, navigate, isBaseRoute, location.pathname]);

    if (isLoading && token) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <Loader />
            </div>
        );
    }

    return (
        <Routes>
            <Route path="/" element={<LoginScreen />} />
            <Route Component={PrivateRoutes}>
                {role === "ADMIN_ASSISTANT" || role === "ADMIN" ? (
                    <Route element={<RolesRoute roles={["ADMIN_ASSISTANT", "ADMIN"]} />}>
                        <Route path="/locations" element={<LocationsScreen />} />
                        <Route path="/locations/add" element={<AddLocation />} />
                        <Route path="/locations/:id/edit" element={<EditLocation />} />
                        <Route path="/locations/:id/show" element={<ShowLocation />} />
                        <Route path="/home" element={<Products />} />
                        <Route path="/home/add" element={<AddProduct />} />
                        <Route path="/home/:id/show" element={<ProductScreen />} />
                        <Route path="/home/:id/edit" element={<EditProductScreen />} />
                        <Route path="/stores" element={<Stores />} />
                        <Route path="/stores/add" element={<AddStore />} />
                        <Route path="/stores/:id/show" element={<StoreScreen />} />
                        <Route path="/stores/:id/edit" element={<EditStore />} />
                        <Route path="/reports" element={<ReportsScreen />} />
                        <Route path="/clients" element={<ClientsScreen />} />
                        <Route path="/clients/add" element={<AddClient />} />
                        <Route path="/clients/:id/show" element={<ShowClient />} />
                        <Route path="/clients/:id/edit" element={<EditClient />} />
                        <Route path="/agents-manifest" element={<DeliveryAgentsManifest />} />
                        <Route path="/statistics" element={<Home />} />
                        <Route path="/tenants" element={<TenantsScreen />} />
                        <Route path="/tenants/add" element={<AddTenant />} />
                        <Route path="/tenants/:id/show" element={<ShowTenant />} />
                        <Route path="/tenants/:id/edit" element={<EditTenant />} />
                        <Route path="/employees" element={<Employees />} />
                        <Route path="/employees/add" element={<AddEmployee />} />
                        <Route path="/employees/:id/show" element={<ShowEmployee />} />
                        <Route path="/employees/:id/edit" element={<EditEmployee />} />
                        <Route path="/branches" element={<BranchesScreen />} />
                        <Route path="/branches/add" element={<AddBranch />} />
                        <Route path="/branches/:id/edit" element={<EditBranch />} />
                        <Route path="/branches/:id/show" element={<ShowBranch />} />
                        <Route path="/sizes" element={<Sizes />} />
                        <Route path="/colors" element={<Colors />} />
                        <Route path="/banners" element={<Banners />} />
                        <Route path="/categories" element={<Categories />} />
                        <Route path="/repositories" element={<RepositoriesScreen />} />
                        <Route path="/repositories/add" element={<AddRepositoryScreen />} />
                        <Route path="/repositories/:id/edit" element={<EditRepositoryScreen />} />
                        <Route path="/deleted" element={<DeletedScreen />} />
                        <Route path="/repositories/:id/show" element={<ShowRepository />} />
                        <Route path="/client-orders-confirm" element={<ConfirmClientOrders />} />
                        <Route path="/users/login-history" element={<UsersLoginHistory />} />
                    </Route>
                ) : null}

                {role === "CLIENT" ? (
                    <Route element={<RolesRoute roles={["CLIENT"]} />}>
                        <Route path="/orders-bulk-create" element={<CreateBulkOrders />} />
                        <Route path="/orders-sheet" element={<OrdersSheet />} />
                        <Route path="/statistics" element={<Home />} />
                        <Route path="/home" element={<Products />} />
                        <Route path="/home/add" element={<AddProduct />} />
                        <Route path="/home/:id/show" element={<ProductScreen />} />
                        <Route path="/home/:id/edit" element={<EditProductScreen />} />
                        <Route path="/reports" element={<ReportsScreen />} />
                        <Route path="/stores" element={<Stores />} />
                        <Route path="/stores/add" element={<AddStore />} />
                        <Route path="/stores/:id/show" element={<StoreScreen />} />
                        <Route path="/stores/:id/edit" element={<EditStore />} />
                    </Route>
                ) : null}

                {role === "REPOSITORIY_EMPLOYEE" ? (
                    <Route element={<RolesRoute roles={["REPOSITORIY_EMPLOYEE"]} />}>
                        <Route path="/repository-entries" element={<RepositoryEntries />} />
                        <Route path="/repositories" element={<RepositoriesScreen />} />
                        <Route path="/repositories/:id/show" element={<ShowRepository />} />
                        <Route path="/repositories/:id/edit" element={<EditRepositoryScreen />} />
                        <Route path="/repositories/add" element={<AddRepositoryScreen />} />
                        <Route path="/reports" element={<ReportsScreen />} />
                        <Route path="/client-orders-confirm" element={<ConfirmClientOrders />} />
                    </Route>
                ) : null}

                {role === "BRANCH_MANAGER" ? (
                    <Route element={<RolesRoute roles={["BRANCH_MANAGER"]} />}>
                        <Route path="/repository-entries" element={<RepositoryEntries />} />
                        <Route path="/employees" element={<Employees />} />
                        <Route path="/employees/:id/edit" element={<EditEmployee />} />
                        <Route path="/employees/add" element={<AddEmployee />} />
                        <Route path="/repositories/add" element={<AddRepositoryScreen />} />
                        <Route path="/repositories/:id/edit" element={<EditRepositoryScreen />} />
                        <Route path="/repositories/:id/show" element={<ShowRepository />} />
                        <Route path="/locations" element={<LocationsScreen />} />
                        <Route path="/locations/add" element={<AddLocation />} />
                        <Route path="/locations/:id/edit" element={<EditLocation />} />
                        <Route path="/locations/:id/show" element={<ShowLocation />} />
                        <Route path="/stores" element={<Stores />} />
                        <Route path="/stores/add" element={<AddStore />} />
                        <Route path="/stores/:id/show" element={<StoreScreen />} />
                        <Route path="/stores/:id/edit" element={<EditStore />} />
                        <Route path="/reports" element={<ReportsScreen />} />
                        <Route path="/clients" element={<ClientsScreen />} />
                        <Route path="/clients/add" element={<AddClient />} />
                        <Route path="/clients/:id/show" element={<ShowClient />} />
                        <Route path="/clients/:id/edit" element={<EditClient />} />
                        <Route path="/agents-manifest" element={<DeliveryAgentsManifest />} />
                        <Route path="/orders-bulk-create" element={<CreateBulkOrders />} />
                    </Route>
                ) : null}

                {role === "ACCOUNTANT" ? (
                    <Route element={<RolesRoute roles={["ACCOUNTANT"]} />}>
                        <Route path="/repository-entries" element={<RepositoryEntries />} />
                        <Route path="/treasury" element={<TreasuryScreen />} />
                        <Route path="/repositories" element={<RepositoriesScreen />} />
                        <Route path="/repositories/add" element={<AddRepositoryScreen />} />
                        <Route path="/repositories/:id/edit" element={<EditRepositoryScreen />} />
                        <Route path="/repositories/:id/show" element={<ShowRepository />} />
                        <Route path="/locations" element={<LocationsScreen />} />
                        <Route path="/locations/add" element={<AddLocation />} />
                        <Route path="/locations/:id/edit" element={<EditLocation />} />
                        <Route path="/locations/:id/show" element={<ShowLocation />} />
                        <Route path="/stores" element={<Stores />} />
                        <Route path="/stores/add" element={<AddStore />} />
                        <Route path="/stores/:id/show" element={<StoreScreen />} />
                        <Route path="/stores/:id/edit" element={<EditStore />} />
                        <Route path="/orders-bulk-create" element={<CreateBulkOrders />} />
                        <Route path="/reports" element={<ReportsScreen />} />
                        <Route path="/clients" element={<ClientsScreen />} />
                        <Route path="/clients/add" element={<AddClient />} />
                        <Route path="/clients/:id/show" element={<ShowClient />} />
                        <Route path="/clients/:id/edit" element={<EditClient />} />
                        <Route path="/agents-manifest" element={<DeliveryAgentsManifest />} />
                    </Route>
                ) : null}

                {role === "COMPANY_MANAGER" ? (
                    <Route element={<RolesRoute roles={["COMPANY_MANAGER"]} />}>
                        <Route path="/treasury" element={<TreasuryScreen />} />
                        <Route path="/forwarded" element={<ForwardedOrders />} />
                        <Route path="/forwarded-to-company" element={<ForwardedOrdersToCompany />} />
                        <Route path="/repository-entries" element={<RepositoryEntries />} />
                        <Route path="/clients" element={<ClientsScreen />} />
                        <Route path="/clients/add" element={<AddClient />} />
                        <Route path="/clients/:id/show" element={<ShowClient />} />
                        <Route path="/clients/:id/edit" element={<EditClient />} />
                        <Route path="/orders-sheet" element={<OrdersSheet />} />
                        <Route path="/orders-bulk-create" element={<CreateBulkOrders />} />
                        <Route path="/agents-manifest" element={<DeliveryAgentsManifest />} />
                        <Route path="/repositories" element={<RepositoriesScreen />} />
                        <Route path="/repositories/:id/show" element={<ShowRepository />} />
                        <Route path="/repositories/:id/edit" element={<EditRepositoryScreen />} />
                        <Route path="/repositories/add" element={<AddRepositoryScreen />} />
                        <Route path="/stores" element={<Stores />} />
                        <Route path="/stores/add" element={<AddStore />} />
                        <Route path="/stores/:id/show" element={<StoreScreen />} />
                        <Route path="/stores/:id/edit" element={<EditStore />} />
                        <Route path="/branches" element={<BranchesScreen />} />
                        <Route path="/branches/add" element={<AddBranch />} />
                        <Route path="/branches/:id/edit" element={<EditBranch />} />
                        <Route path="/branches/:id/show" element={<ShowBranch />} />
                        <Route path="/locations" element={<LocationsScreen />} />
                        <Route path="/locations/add" element={<AddLocation />} />
                        <Route path="/locations/:id/edit" element={<EditLocation />} />
                        <Route path="/locations/:id/show" element={<ShowLocation />} />
                        <Route path="/sizes" element={<Sizes />} />
                        <Route path="/reports" element={<ReportsScreen />} />
                        <Route path="/colors" element={<Colors />} />
                        <Route path="/banners" element={<Banners />} />
                        <Route path="/categories" element={<Categories />} />
                        <Route path="/statistics" element={<Home />} />
                        <Route path="/employees" element={<Employees />} />
                        <Route path="/employees/add" element={<AddEmployee />} />
                        <Route path="/employees/:id/show" element={<ShowEmployee />} />
                        <Route path="/employees/:id/edit" element={<EditEmployee />} />
                        <Route path="/deleted" element={<DeletedScreen />} />
                        <Route path="/home" element={<Products />} />
                        <Route path="/home/add" element={<AddProduct />} />
                        <Route path="/home/:id/show" element={<ProductScreen />} />
                        <Route path="/home/:id/edit" element={<EditProductScreen />} />
                        <Route path="/orders-auto-update" element={<OrdersAutoUpdate />} />
                        <Route path="/client-orders-confirm" element={<ConfirmClientOrders />} />
                        <Route path="/users/login-history" element={<UsersLoginHistory />} />
                    </Route>
                ) : null}

                {role === "DATA_ENTRY" ? (
                    <Route element={<RolesRoute roles={["DATA_ENTRY"]} />}>
                        <Route path="/locations" element={<LocationsScreen />} />
                        <Route path="/locations/add" element={<AddLocation />} />
                        <Route path="/locations/:id/edit" element={<EditLocation />} />
                        <Route path="/locations/:id/show" element={<ShowLocation />} />
                        <Route path="/home" element={<Products />} />
                        <Route path="/home/add" element={<AddProduct />} />
                        <Route path="/home/:id/show" element={<ProductScreen />} />
                        <Route path="/home/:id/edit" element={<EditProductScreen />} />
                        <Route path="/stores" element={<Stores />} />
                        <Route path="/stores/add" element={<AddStore />} />
                        <Route path="/stores/:id/show" element={<StoreScreen />} />
                        <Route path="/stores/:id/edit" element={<EditStore />} />
                        <Route path="/orders-bulk-create" element={<CreateBulkOrders />} />
                        <Route path="/orders-sheet" element={<OrdersSheet />} />
                        <Route path="/clients" element={<ClientsScreen />} />
                        <Route path="/clients/add" element={<AddClient />} />
                        <Route path="/clients/:id/show" element={<ShowClient />} />
                        <Route path="/clients/:id/edit" element={<EditClient />} />
                        <Route path="/agents-manifest" element={<DeliveryAgentsManifest />} />
                        <Route path="/client-orders-confirm" element={<ConfirmClientOrders />} />
                    </Route>
                ) : null}

                {role === "CLIENT_ASSISTANT" ? (
                    <Route element={<RolesRoute roles={["CLIENT_ASSISTANT"]} />}>
                        <Route path="/home" element={<Products />} />
                        <Route path="/home/add" element={<AddProduct />} />
                        <Route path="/home/:id/show" element={<ProductScreen />} />
                        <Route path="/home/:id/edit" element={<EditProductScreen />} />
                        <Route path="/stores" element={<Stores />} />
                        <Route path="/stores/add" element={<AddStore />} />
                        <Route path="/stores/:id/show" element={<StoreScreen />} />
                        <Route path="/stores/:id/edit" element={<EditStore />} />
                    </Route>
                ) : null}

                {/* public routes */}
                <Route path="/orders" element={<OrdersScreen />} />
                <Route path="/orders/add" element={<AddOrder />} />
                <Route path="/orders/:id/show" element={<ShowOrder />} />
                <Route path="/orders/:id/edit" element={<EditOrder />} />
            </Route>
        </Routes>
    );
}

export default App;
