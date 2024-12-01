import { ActionIcon, Avatar, Group, Menu, Text, UnstyledButton, rem } from "@mantine/core";

import { useTheme } from "@/hooks/theme-provider";
import { useSignOut } from "@/hooks/useSignOut";
import { useAuth } from "@/store/authStore";
import { IconChevronLeft, IconDots, IconLogout, IconMoon, IconSunHigh } from "@tabler/icons-react";
import classes from "./UserButton.module.css";

export const UserNavCard = () => {
    const { name, username } = useAuth();
    const { theme: displayTheme, setTheme } = useTheme();
    const { mutate: signOut } = useSignOut();

    const handleSignOut = () => {
        signOut();
    };

    return (
        <UnstyledButton component="a" className={classes.user}>
            <Group>
                <Avatar radius="xl">{name ? name[0].toUpperCase() + name[1].toUpperCase() : ""}</Avatar>

                <div style={{ flex: 1 }}>
                    <Text ta="start" size="sm" fw={500}>
                        {name}
                    </Text>

                    <Text ta="start" c="dimmed" size="xs">
                        {username}
                    </Text>
                </div>
                <Group justify="center">
                    <Menu
                        withArrow
                        width={250}
                        position="bottom"
                        transitionProps={{ transition: "pop" }}
                        withinPortal
                    >
                        <Menu.Target>
                            <ActionIcon variant="default">
                                <IconDots style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                            </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item
                                rightSection={
                                    <IconChevronLeft
                                        style={{ width: rem(16), height: rem(16) }}
                                        stroke={1.5}
                                    />
                                }
                            >
                                <Group>
                                    <Avatar radius="xl">
                                        {name ? name[0].toUpperCase() + name[1].toUpperCase() : ""}
                                    </Avatar>

                                    <div>
                                        <Text fw={500}>{name}</Text>
                                        <Text size="xs" c="dimmed">
                                            {username}
                                        </Text>
                                    </div>
                                </Group>
                            </Menu.Item>
                            <Menu.Item
                                onClick={() => {
                                    setTheme(displayTheme === "dark" ? "light" : "dark");
                                }}
                                leftSection={
                                    displayTheme === "dark" ? (
                                        <IconSunHigh
                                            style={{ width: rem(16), height: rem(16) }}
                                            stroke={1.5}
                                        />
                                    ) : (
                                        <IconMoon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                                    )
                                }
                            >
                                وضع {displayTheme === "dark" ? "النهاري" : "الليلي"}
                            </Menu.Item>
                            <Menu.Item
                                onClick={handleSignOut}
                                leftSection={
                                    <IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                                }
                            >
                                تسجيل الخروج
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </Group>
        </UnstyledButton>
    );
};
