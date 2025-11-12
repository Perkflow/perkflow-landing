"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Briefcase } from "lucide-react";
import { useTranslations } from "next-intl";

interface RoleItem {
  name: string;
  department: string;
  location: string;
}

export default function Roles() {
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [roles, setRoles] = useState<RoleItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const t = useTranslations("Careers_Page");

  useEffect(() => {
    const controller = new AbortController();
    const fetchRoles = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const params = new URLSearchParams();
        if (department) params.set("department", department);
        if (location) params.set("location", location);
        if (searchInput) params.set("search", searchInput);
        const res = await fetch(`/api/cms/careers?${params.toString()}`, {
          signal: controller.signal,
          cache: "no-store",
        });
        if (!res.ok) throw new Error(`Failed to load careers (${res.status})`);
        const data = await res.json();
        const docs: any[] = Array.isArray(data?.docs) ? data.docs : [];
        const mapped: RoleItem[] = docs
          .filter((d) => d?.status === "open")
          .map((d) => ({
            name: String(d?.title ?? ""),
            department: String(d?.department ?? "").toLowerCase(),
            location: String(d?.location ?? "").toLowerCase(),
          }));
        setRoles(mapped);
      } catch (e: any) {
        if (e?.name !== "AbortError")
          setError(e?.message || "Error loading roles");
      } finally {
        setIsLoading(false);
      }
    };
    fetchRoles();
    return () => controller.abort();
  }, [department, location, searchInput]);

  const filteredRoles = useMemo(() => {
    return roles.filter((role) => {
      const matchesDepartment =
        department === "" || role.department === department;
      const matchesLocation = location === "" || role.location === location;
      const s = searchInput.toLowerCase();
      const matchesSearch =
        searchInput === "" ||
        role.name.toLowerCase().includes(s) ||
        role.department.toLowerCase().includes(s) ||
        role.location.toLowerCase().includes(s);
      return matchesDepartment && matchesLocation && matchesSearch;
    });
  }, [roles, department, location, searchInput]);

  const groupedRoles = useMemo(() => {
    return filteredRoles.reduce<Record<string, RoleItem[]>>((groups, role) => {
      if (!groups[role.department]) groups[role.department] = [];
      groups[role.department].push(role);
      return groups;
    }, {});
  }, [filteredRoles]);

  const searchLower = searchInput.toLowerCase();
  const filteredOptions = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchLower) ||
      role.department.toLowerCase().includes(searchLower) ||
      role.location.toLowerCase().includes(searchLower)
  );

  const handleSelect = (value: string) => {
    setSearchInput(value);
    setShowOptions(false);
  };

  const EmptyState = ({
    title,
    subtitle,
  }: {
    title: string;
    subtitle?: string;
  }) => (
    <div className="flex w-full items-center justify-center">
      <div className="w-full rounded-lg border border-gray-200 bg-white p-8 text-center md:w-2/3">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
          <Briefcase className="h-6 w-6 text-gray-500" />
        </div>
        <h3 className="mb-1 text-base font-semibold text-gray-800">{title}</h3>
        {subtitle ? <p className="text-sm text-gray-500">{subtitle}</p> : null}
      </div>
    </div>
  );

  return (
    <div id="open-roles" className="bg-white px-4 py-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-2xl font-bold">{t("openRole.heading")}</h1>

        {/* Filters */}
        <div className="flex w-full flex-col items-center justify-between gap-4 bg-white md:flex-row">
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 md:w-1/4"
          >
            <option value="">
              {t("openRole.filter.department.option.all")}
            </option>
            <option value="engineering">
              {t("openRole.filter.department.option.engineering")}
            </option>
            <option value="design">
              {t("openRole.filter.department.option.design")}
            </option>
            <option value="marketing">
              {t("openRole.filter.department.option.marketing")}
            </option>
            <option value="sales">
              {t("openRole.filter.department.option.sales")}
            </option>
            <option value="management">
              {t("openRole.filter.department.option.management")}
            </option>
          </select>

          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 md:w-1/4"
          >
            <option value="">{t("openRole.filter.location.option.all")}</option>
            <option value="remote">
              {t("openRole.filter.location.option.remote")}
            </option>
            <option value="on site">
              {t("openRole.filter.location.option.on_site")}
            </option>
            <option value="hybrid">
              {t("openRole.filter.location.option.hybrid")}
            </option>
          </select>

          {/* Search input */}
          <div
            className="relative w-full md:w-1/3"
            ref={dropdownRef}
            onBlur={(e) => {
              if (!dropdownRef.current?.contains(e.relatedTarget as Node)) {
                setShowOptions(false);
              }
            }}
          >
            <div className="relative">
              <div className="absolute top-1/2 left-2 -translate-y-1/2 text-gray-400">
                <ChevronDown size={16} />
              </div>
              <input
                type="text"
                placeholder={t("openRole.filter.searchInput.placeholder")}
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  setShowOptions(true);
                }}
                onFocus={() => setShowOptions(true)}
                className="focus:ring-primary w-full rounded-md border border-gray-300 py-2 pr-4 pl-8 text-sm focus:ring-2 focus:outline-none"
              />
            </div>

            {showOptions &&
              searchInput.trim() !== "" &&
              filteredOptions.length > 0 && (
                <ul className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-md border border-gray-200 bg-white text-sm shadow-lg">
                  {filteredOptions.map((role) => (
                    <li
                      key={`${role.name}-${role.location}`}
                      onClick={() => handleSelect(role.name)}
                      tabIndex={0}
                      className="flex cursor-pointer justify-between px-4 py-2 hover:bg-gray-100"
                    >
                      <span className="font-medium">{role.name}</span>
                      <span className="text-gray-500 capitalize">
                        {role.location}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
          </div>
        </div>

        {/* Results */}
        <div className="my-6">
          {isLoading ? (
            <p className="text-gray-500">{t("openRole.results.isLoading")}</p>
          ) : roles.length === 0 || error ? (
            <EmptyState
              title={t("openRole.results.emptyState.no_role_found.title")}
              subtitle={t("openRole.results.emptyState.no_role_found.subtitle")}
            />
          ) : filteredRoles.length > 0 ? (
            <>
              {Object.entries(groupedRoles).map(([dept, roles]) => (
                <div key={dept} className="mb-6">
                  <h2 className="mb-3 text-lg font-semibold text-gray-700 capitalize">
                    {dept}
                  </h2>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="border-b bg-gray-100 text-gray-600">
                          <th className="w-2/3 px-4 py-2">
                            {t("openRole.results.table.head_role")}
                          </th>
                          <th className="w-1/3 px-4 py-2 text-center">
                            {t("openRole.results.table.head_location")}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {roles.map((role, index) => (
                          <tr
                            key={`${role.name}-${index}`}
                            className="border-b last:border-b-0"
                          >
                            <td className="px-4 py-3 font-medium">
                              {role.name}
                            </td>
                            <td className="px-4 py-3 text-center text-gray-500 capitalize">
                              {role.location}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <EmptyState
              title={t("openRole.results.emptyState.no_match.title")}
              subtitle={t("openRole.results.emptyState.no_match.subtitle")}
            />
          )}
        </div>
      </div>
    </div>
  );
}
