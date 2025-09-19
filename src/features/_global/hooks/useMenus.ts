import { useProfile } from "../../profile/useProfile";

export const useMenus = () => {
  const { data: profile, isFetching } = useProfile();
  const isMentor = profile?.data?.isMentor as boolean;

  const menu = [
    {
      title: "Master",
      items: [
        {
          id: 1.0,
          name: "Home",
          path: "/",
        },
        ...(isMentor
          ? [
              {
                id: 1.1,
                name: "My Class",
                path: "/dashboard/my-class",
              },
            ]
          : []),
        {
          id: 1.2,
          name: "Enrolled Class",
          path: "/dashboard/enrolled-class",
        },
        {
          id: 1.3,
          name: "Certificates",
          path: "/dashboard/certificates",
        },
        {
          id: 1.4,
          name: "Ticket Support",
          path: "/dashboard/ticket-supports",
        },
      ],
    },
  ];

  // Filter menu group jika tidak ada item di dalamnya
  const filteredMenu = menu.filter(
    (group) => isMentor || group.items.length > 1
  );

  return {
    isFetching,
    menus: filteredMenu,
  };
};
