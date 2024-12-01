import { isAuthorized } from "@/hooks/useAuthorized";
import { navSections } from "@/mockup/navSections";
import { useAuth } from "@/store/authStore";
import { AppShell, Burger, Group, Loader, ScrollArea, Text, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { NotificationsList } from "../NotificationsList";
import { UserNavCard } from "../UserNavCard";
import classes from "./NavbarNested.module.css";

interface Props {
    children: React.ReactNode;
    isLoading?: boolean;
    isError?: boolean;
}

export const AppLayout = ({ children, isLoading, isError }: Props) => {
    const { companyName } = useAuth();

    const pathName = useLocation().pathname;

    const renderActiveLinkArabicName = () => {
        const trimmedPathName = pathName.split("/")[1];
        const activeLink = navSections.find((item) => item.link === `/${trimmedPathName}`);

        if (activeLink) {
            return activeLink.label;
        }
        return "";
    };

    const [active, setActive] = useState(navSections.find((item) => item.link === pathName)?.label || "");

    const Devider = () => (
        <div
            style={{
                borderTop: "1px solid",
                width: "90%",
                marginBlock: "5px",
                borderColor: "light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))"
            }}
        />
    );

    const links = navSections.map((item) => {
        const canRenderItem = isAuthorized(item.roles);
        if (!canRenderItem) {
            if (item.lastOfGroup) {
                return <Devider />;
            }
            return null;
        }
        return (
            <div key={item.label}>
                <Link
                    className={classes.link}
                    data-active={item.label === active || undefined}
                    to={item.link}
                    key={item.label}
                    onClick={() => {
                        setActive(item.label);
                    }}
                    // style={item.lastOfGroup ? { marginBottom: "10px" } : {}}
                >
                    <item.icon className={classes.linkIcon} stroke={1.5} />
                    <span>{item.label}</span>
                </Link>
                {item.lastOfGroup && <Devider />}
            </div>
        );
    });

    const handleRender = () => {
        if (isLoading) {
            return (
                <div className="w-full h-[80vh] flex justify-center items-center">
                    <Loader />
                </div>
            );
        }

        if (isError) {
            return (
                <div className="w-full h-[80vh] flex justify-center items-center">
                    <h1 className="text-primary text-3xl">حدث خطأ ما، يرجى المحاولة مرة أخرى</h1>
                </div>
            );
        }

        return children;
    };
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
    return (
        <AppShell
            header={{ height: rem(60), offset: true }}
            navbar={{
                width: rem(250),
                breakpoint: "sm",
                collapsed: { mobile: !mobileOpened, desktop: !desktopOpened }
            }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" w="100%" px="md" justify="space-between">
                    <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
                    <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />

                    <Text ta="center" size="md" fw={700}>
                        {companyName && `${companyName} / `} {renderActiveLinkArabicName()}
                    </Text>

                    <div className="-ml-2">
                        <NotificationsList />
                    </div>
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p="md" mt={0} py={rem(0)}>
                <AppShell.Section grow my="lg" component={ScrollArea}>
                    <Devider />
                    <div className={classes.linksInner}>{links}</div>
                    <Devider />
                </AppShell.Section>
                <AppShell.Section>
                    <UserNavCard />
                </AppShell.Section>
            </AppShell.Navbar>
            <AppShell.Main pt={rem(100)}>{handleRender()}</AppShell.Main>
        </AppShell>
    );
};
