"use client";
import BreadCrumb from "@/components/Application/Admin/BreadCrumb";
import UploadMedia from "@/components/Application/Admin/UploadMedia";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ADMIN_DASHBOARD, ADMIN_MEDIA_SHOW } from "@/routes/AdminPanelRoute";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import Media from "@/components/Application/Admin/Media";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import useDeleteMutation from "@/hooks/useDeleteMutation";
import ButtonLoading from "@/components/Application/ButtonLoading";

const breadcrumbData = [
  { href: ADMIN_DASHBOARD, label: "Home" },
  { href: "", label: "Media" },
];

const MediaPage = () => {
  const [deleteType, setDeleteType] = useState("SD");
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (searchParams) {
      const trashOf = searchParams.get("trashOf");
      setSelectedMedia([]);
      if (trashOf) {
        setDeleteType("PD");
      } else {
        setDeleteType("SD");
      }
    }
  }, [searchParams]);

  const fetchMedia = async (page, deleteType) => {
    const { data:response } = await axios.get(
      `/api/media?page=${page}&&limit=10&&deleteType=${deleteType}`
    );

    return response;
  };

  const { data, error, fetchNextPage, hasNextPage, isFetching, status } =
    useInfiniteQuery({
      queryKey: ["media-data", deleteType],
      queryFn: async ({ pageParam }) => await fetchMedia(pageParam, deleteType),
      initialPageParam: 0,
      getNextPageParam: (lastPage, pages) => {
        const nextPage = pages.length;
        return lastPage.hasMore ? nextPage : undefined;
      },
    });

  const deleteMutation = useDeleteMutation("media-data", "/api/media/delete");

  const handleDelete = (ids, deleteType) => {
    let c = true;
    if (deleteType === "PD") {
      c = confirm("Are you sure you want to delete data permanent?");
    }
    if (c) {
      deleteMutation.mutate({ ids, deleteType });
    }
    setSelectAll(false);
    setSelectedMedia([]);
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  useEffect(() => {
    if (selectAll) {
      const ids = data.pages.flatMap((page) =>
        page.mediaData.map((media) => media._id)
      );
      setSelectedMedia(ids);
    } else {
      setSelectedMedia([]);
    }
  }, [selectAll]);

  return (
    <div>
      <BreadCrumb breadcrumbData={breadcrumbData} />
      <Card className="py-0 rounded shadow-sm ">
        <CardHeader className="pt-3 px-3 border-b [.border-b]:pb-2">
          <div className="flex justify-between items-center">
            <h1 className="font-semibold text-xl uppercase">
              {deleteType === "SD" ? "Media" : "Media Trash"}
            </h1>

            <div className="flex items-center gap-5">
              {deleteType === "SD" && (
                <UploadMedia isMultiple={true} queryClient={queryClient} />
              )}

              <div className="flex gap-3">
                {deleteType === "SD" ? (
                  <Button type="button" variant="destructive">
                    <Link href={`${ADMIN_MEDIA_SHOW}?trashOf=media`}>
                      Trash
                    </Link>
                  </Button>
                ) : (
                  <Button type="button">
                    <Link href={`${ADMIN_MEDIA_SHOW}`}>Back to Media</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-5">
        {selectedMedia.length > 0 && (
          <div className="py-2 px-3 bg-violet-200 mb-2 rounded flex justify-between items-center">
            <Label>
              <Checkbox
                checked={selectAll}
                onCheckedChange={handleSelectAll}
                className="border-primary cursor-pointer"
              />
              Select All
            </Label>

            <div className="flex gap-2">
              {deleteType === "SD" ? (
                <Button
                  className="cursor-pointer"
                  variant="destructive"
                  onClick={() => handleDelete(selectedMedia, deleteType)}
                >
                  Move Into Trash
                </Button>
              ) : (
                <>
                  <Button
                    className="bg-green-500 hover:bg-green-600 cursor-pointer"
                    onClick={() => handleDelete(selectedMedia, "RSD")}
                  >
                    Restore
                  </Button>

                  <Button
                    className="cursor-pointer"
                    variant="destructive"
                    onClick={() => handleDelete(selectedMedia, deleteType)}
                  >
                    Delete Permanent
                  </Button>
                </>
              )}
            </div>
          </div>
        )}

        
          {status === "pending" ? (
            <div>Loading...</div>
          ) : status === "error" ? (
            <div className="text-red-500 text-sm">{error.message}</div>
          ) : (
            <div className="grid lg:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-2 mb-5">
              {data?.pages?.map((page, index) => (
                <React.Fragment key={index}>
                  {page?.mediaData?.map((media) => (
                    <Media
                      key={media._id}
                      media={media}
                      handleDelete={handleDelete}
                      deleteType={deleteType}
                      selectedMedia={selectedMedia}
                      setSelectedMedia={setSelectedMedia}
                    />
                  ))}
                </React.Fragment>
              ))}
            </div>
          )}

          {hasNextPage && (
            <ButtonLoading
              type="button"
              loading={isFetching}
              onClick={() => fetchNextPage()}
              text="Load More"
              className="cursor-pointer"
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MediaPage;
