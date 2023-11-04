/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { PaginateProps } from "./Paginate.type";
import ComboBox from "../ComboBox/ComboBox";
import Icon from "../Icon/Icon";
import Container from "../Container";
import { classNames } from "@/app/shared/utils/helpers";

const Paginate = ({ count, className = "", setOpts, opts }: PaginateProps) => {
  const [paginas, setPaginas] = useState<number[]>([]);
  const pages = Math.ceil(count / opts.limit);

  const setPaginasConfig = () => {
    const paginasLista: number[] = [];
    for (let index = 0; index < pages; index += 1) paginasLista.push(index + 1);
    setPaginas(paginasLista);
    return 0;
  };

  const handleChangeLimit = (valor: { campo: string; valor: number }) => {
    setOpts({
      ...opts,
      limit: valor.valor,
      page: 1,
      replaceAll: true,
    });
  };

  useEffect(() => {
    setPaginasConfig();
    return () => setPaginas([]);
  }, [opts, pages]);

  return (
    <>
      {count > 0 && (
        <Container
          size={{ width: "w-full" }}
          display="flex"
          flexDirection="lg:flex-row md:flex-row flex-col"
          gap="lg:gap-0 md:gap-0 gap-5"
          justify="justify-between"
          align="items-center"
          separator={{ padding: "py-2" }}
          className={classNames(className, "caption")}
        >
          <Container
            font={{ size: "text-sm" }}
            className="items-center"
            flexDirection="flex-row"
            justify="justify-center"
            align="items-center"
            display="flex"
            gap="gap-2"
          >
            <span>Página</span>
            {opts.page}
            <span>de</span>
            {pages}
            <span>, Mostrando </span>
            <ComboBox<{ campo: string; valor: number }>
              labelField="campo"
              valueField="valor"
              size={{ width: "w-20" }}
              value={{ valor: opts.limit, campo: opts.limit + "" }}
              items={[25, 50, 100, 150, 200].map((item) => {
                return { valor: item, campo: item + "" };
              })}
              name="page"
              onChange={handleChangeLimit}
            />
            <span>de </span>
            {count}
            <span>registros </span>
          </Container>
          <Container
            display="flex"
            flexDirection="flex-row"
            align="items-center"
          >
            <Icon
              remixicon="ri-arrow-left-double-line"
              className="h-5 w-5 text-gray-500 cursor-pointer"
              onClick={() => {
                if (opts.page > 1)
                  setOpts({ ...opts, page: 1, replaceAll: true });
              }}
            />
            <Icon
              remixicon="ri-arrow-left-s-line"
              className="h-5 w-5 text-gray-500 cursor-pointer"
              onClick={() => {
                if (opts.page > 1)
                  setOpts({ ...opts, page: opts.page - 1, replaceAll: true });
              }}
            />

            {paginas.map((item) => {
              return (
                // eslint-disable-next-line
                <div
                  key={item}
                  onClick={() => {
                    if (opts.page === item) return;
                    setOpts({ ...opts, page: item, replaceAll: true });
                  }}
                  className={classNames(
                    "mx-1 px-1 text-sm w-8 flex items-center justify-center h-8 rounded-md cursor-pointer transition-all hover:bg-gray-600 hover:text-white",
                    opts.page === item
                      ? "bg-primary text-white"
                      : "text-gray-900 border border-gray-400",
                    opts.page + 3 <= item ? (item <= 5 ? "" : "hidden") : "",
                    opts.page - 3 >= item
                      ? item > pages - 5
                        ? ""
                        : "hidden"
                      : ""
                  )}
                >
                  {item}
                </div>
              );
            })}

            <Icon
              remixicon="ri-arrow-right-s-line"
              className="h-5 w-5 text-gray-500 cursor-pointer"
              onClick={() => {
                if (opts.page < pages)
                  setOpts({ ...opts, page: opts.page + 1, replaceAll: true });
              }}
            />
            <Icon
              remixicon="ri-arrow-right-double-line"
              className="h-5 w-5 text-gray-500 cursor-pointer"
              onClick={() => {
                if (opts.page < pages)
                  setOpts({ ...opts, page: pages, replaceAll: true });
              }}
            />
          </Container>
        </Container>
      )}
    </>
  );
};

export default Paginate;
