import HIMTI from "@core/assets/logo/HIMTI.png";
import { useAtom } from "jotai";
import { CheckCircle, Menu, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { HiDocumentMinus, HiDocumentText } from "react-icons/hi2";
import { IoChevronForward, IoChevronUp } from "react-icons/io5";
import {
  Link,
  Navigate,
  Outlet,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useDetailClass } from "../../class/hooks/useClasses";
import { DashboardNavbar } from "../../dashboard/components/navbar";
import { Skeleton } from "../components/Shimer";
import { DarkModeAtom, LearningSidebarAtom } from "../store";
import { convertQueryParamsToObject } from "../helper";
import { CONFIG_APP } from "../../../core/configs/app";

export const LearningUserRoot = () => {
  const [darkMode, setDarkMode] = useAtom(DarkModeAtom);

  const [sidebarOpen, setSidebarOpen] = useAtom(LearningSidebarAtom);
  const [isMobile, setIsMobile] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const moduleIdQs = searchParams.get("moduleId") || "";
  const { data: classess, isFetching } = useDetailClass();
  // Perbaikan 1: Gunakan useMemo untuk inisialisasi awal modules
  const initialModules = useMemo(() => {
    return classess?.data?.sessions.map((item, index) => {
      const isOpen = moduleIdQs
        ? item.modules.some((mdl) => mdl.id === moduleIdQs)
        : index === 0; // Hanya buka session pertama jika tidak ada moduleIdQs
      return { ...item, isOpen };
    });
  }, [classess?.data?.sessions, moduleIdQs]);

  const [modules, setModules] = useState(initialModules);

  useEffect(() => {
    if (initialModules) {
      setModules(initialModules);
    }
  }, [initialModules]);

  // Perbaikan 3: Optimalkan toggleModule
  const toggleModule = useCallback((index: number) => {
    setModules((prevModules) => {
      if (!prevModules) return prevModules;

      // Buat salinan baru dari array modules
      const updatedModules = [...prevModules];

      // Jika module ini tidak memiliki sub-modules, tidak perlu melakukan apa-apa
      if (!updatedModules[index].modules.length) {
        return prevModules;
      }

      // Tutup semua session lainnya sebelum membuka yang baru (opsional)
      // Jika ingin hanya satu session terbuka dalam satu waktu
      if (updatedModules[index].isOpen === false) {
        updatedModules.forEach((mod, i) => {
          if (i !== index) mod.isOpen = false;
        });
      }

      // Toggle status isOpen untuk module yang diklik
      updatedModules[index] = {
        ...updatedModules[index],
        isOpen: !updatedModules[index].isOpen,
      };

      return updatedModules;
    });
  }, []);
  const queries = convertQueryParamsToObject(searchParams.toString());
  const navigate = useNavigate();
  const { classId } = useParams();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!moduleIdQs && modules?.[0]?.modules?.[0]?.id) {
      setSearchParams({
        ...queries,
        moduleId: modules[0].modules[0].id,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleIdQs]); // Empty dependency array

  const handleClickModule = useCallback(
    (moduleId: string) => {
      navigate(`/learning/${classId}?moduleId=${moduleId}`);
    },
    [classId, navigate]
  );

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const token = localStorage.getItem(CONFIG_APP.TOKEN_KEY);
    if (!token) return <Navigate to={"/sign-in"} />;
  return (
    <>
      <DashboardNavbar />
      <div
        className={`z-[998] fixed flex min-h-screen h-full w-full ${
          darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
        } overflow-y-auto`}
      >
        {/* Sidebar */}
        <div
          className={`fixed z-20 top-0 left-0 bottom-0 w-64 transition-all duration-300 ${
            darkMode ? "bg-gray-800" : "bg-white"
          } shadow-md flex flex-col ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0 md:w-20"
          }`}
        >
          {/* Sidebar Header (fixed height) */}
          <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 h-16 flex-shrink-0">
            {sidebarOpen ? (
              <X
                size={24}
                className="text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
                onClick={toggleSidebar}
              />
            ) : (
              <Menu
                size={24}
                className="text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
                onClick={toggleSidebar}
              />
            )}
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            {sidebarOpen && (
              <>
                {/* Logo and Back Link */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <img src={HIMTI} width={100} className="mx-2" alt="HIMTI" />
                </div>
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <Link
                      to="/dashboard/enrolled-class"
                      className="block transition-colors"
                    >
                      <h3
                        className={`font-medium ${
                          darkMode
                            ? "text-gray-200 dark:text-gray-800"
                            : "text-gray-800 dark:text-gray-200"
                        }`}
                      >
                        Back to Dashboard
                      </h3>
                    </Link>
                  </div>
                </div>
                {/* Dark Mode Toggle */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-medium ${
                        darkMode
                          ? "text-gray-200 dark:text-gray-800"
                          : "text-gray-800 dark:text-gray-200"
                      }`}
                    >
                      Dark Mode
                    </span>
                    <div
                      className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${
                        darkMode ? "bg-blue-600" : "bg-gray-300"
                      }`}
                      onClick={toggleDarkMode}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                          darkMode ? "translate-x-6" : ""
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Course Modules (scrollable) */}
            <div className="overflow-y-auto">
              {isFetching ? (
                <div className="flex flex-col gap-4 px-2 mt-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} width="100%" height="40px" />
                  ))}
                </div>
              ) : (
                (modules || []).map((module, index) => (
                  <div
                    key={index}
                    className={`border-b ${
                      darkMode ? "border-gray-700" : "border-gray-200"
                    }`}
                  >
                    {/* Session Header */}
                    <div
                      className={`p-4 flex items-start justify-between cursor-pointer ${
                        darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                      } transition-colors`}
                      onClick={() => toggleModule(index)}
                    >
                      {sidebarOpen ? (
                        <div className="flex items-center gap-2">
                          {module.isOpen ? (
                            <IoChevronUp
                              size={16}
                              className="text-gray-500 dark:text-gray-400"
                            />
                          ) : (
                            <IoChevronForward
                              size={16}
                              className="text-gray-500 dark:text-gray-400"
                            />
                          )}
                          <div className="flex items-center gap-4">
                            <h3
                              className={`font-medium ${
                                darkMode ? "text-gray-200" : "text-gray-800"
                              }`}
                            >
                              {module.name}
                            </h3>
                            {module.isCompleted ? (
                              <FaCheckCircle
                                size={16}
                                className={`${
                                  module.isCompleted
                                    ? "text-green-500"
                                    : "text-gray-500"
                                } dark:text-gray-400`}
                              />
                            ) : null}
                          </div>
                        </div>
                      ) : (
                        <div className="w-full flex justify-center">
                          {module.isCompleted ? (
                            <FaCheckCircle
                              size={20}
                              className={`${
                                module.isCompleted
                                  ? "text-green-500"
                                  : "text-gray-500"
                              } dark:text-gray-400`}
                            />
                          ) : (
                            <HiDocumentMinus
                              size={20}
                              className={`${
                                module.isCompleted
                                  ? "text-green-500"
                                  : "text-gray-500"
                              } dark:text-gray-400`}
                            />
                          )}
                        </div>
                      )}
                    </div>

                    {/* Module Items */}
                    {sidebarOpen && module.isOpen && module.modules && (
                      <div className="pl-4 pr-2 pb-2">
                        {module.modules.map((lesson) => {
                          const isActive = lesson.id === moduleIdQs;
                          const isCompleted = lesson.isCompleted;

                          const baseStyles = `p-2 rounded-lg mb-2 flex items-center cursor-pointer transition-colors duration-200 ${
                            darkMode
                              ? isActive
                                ? isCompleted
                                  ? "bg-green-900/30 border-l-4 border-green-500"
                                  : "bg-blue-900/30 border-l-4 border-blue-500"
                                : isCompleted
                                ? "bg-green-900/20 hover:bg-green-900/30"
                                : "hover:bg-gray-700"
                              : isActive
                              ? isCompleted
                                ? "bg-green-50 border-l-4 border-green-500"
                                : "bg-blue-50 border-l-4 border-blue-500"
                              : isCompleted
                              ? "bg-green-50 hover:bg-green-100"
                              : "hover:bg-gray-50"
                          }`;

                          const iconStyles = `w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                            darkMode
                              ? isActive
                                ? isCompleted
                                  ? "bg-green-800 text-green-300"
                                  : "bg-blue-800 text-blue-300"
                                : isCompleted
                                ? "bg-green-800/50 text-green-300"
                                : "bg-gray-700 text-gray-400"
                              : isActive
                              ? isCompleted
                                ? "bg-green-100 text-green-600"
                                : "bg-blue-100 text-blue-600"
                              : isCompleted
                              ? "bg-green-100 text-green-600"
                              : "bg-gray-200 text-gray-500"
                          }`;

                          const textStyles = `text-sm font-medium ${
                            darkMode
                              ? isActive
                                ? isCompleted
                                  ? "text-green-300"
                                  : "text-blue-300"
                                : isCompleted
                                ? "text-green-300"
                                : "text-gray-300"
                              : isActive
                              ? isCompleted
                                ? "text-green-700"
                                : "text-blue-700"
                              : isCompleted
                              ? "text-green-700"
                              : "text-gray-700"
                          }`;

                          return (
                            <div
                              key={lesson.id}
                              className={baseStyles}
                              onClick={() => handleClickModule(lesson.id)}
                            >
                              <div className={iconStyles}>
                                {isCompleted ? (
                                  <CheckCircle size={16} />
                                ) : (
                                  <HiDocumentText size={16} />
                                )}
                              </div>
                              <div className="flex-1">
                                <h4 className={textStyles}>{lesson.name}</h4>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Overlay for mobile */}
        {isMobile && sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10"
            onClick={toggleSidebar}
          />
        )}
        <Outlet />
      </div>
    </>
  );
};
