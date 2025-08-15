import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import ProductModel from "@/models/Product.model";
import { NextResponse } from "next/server";


export async function GET(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized.");
    }

    await connectDB();
    const searchParams = request.nextUrl.searchParams;
    // extract query parameters

    const start = parseInt(searchParams.get("start") || 0, 10);
    const size = parseInt(searchParams.get("size") || 10, 10);
    const filters = JSON.parse(searchParams.get("filters") || "[]");
    const globalFilter = searchParams.get("globalFilter") || "";
    const sorting = JSON.parse(searchParams.get("sorting") || "[]");
    const deleteType = searchParams.get("deleteType");

    // build match query
    let matchQuery = {};

    if (deleteType === "SD") {
      matchQuery = { deletedAt: null };
    } else if (deleteType === "PD") {
      matchQuery = { deletedAt: { $ne: null } };
    }

    // global search
    if (globalFilter) {
      matchQuery["$or"] = [
        { name: { $regex: globalFilter, $options: "i" } },
        { slug: { $regex: globalFilter, $options: "i" } },
        { "categoryData.name": { $regex: globalFilter, $options: "i" } },
        { brand: { $regex: globalFilter, $options: "i" } },
        { productType: { $regex: globalFilter, $options: "i" } },
        { usageInstructions: { $regex: globalFilter, $options: "i" } },
        { usageInstructions: { $regex: globalFilter, $options: "i" } },
        { material: { $regex: globalFilter, $options: "i" } },
        { ageGroup: { $regex: globalFilter, $options: "i" } },
        { status: { $regex: globalFilter, $options: "i" } },
        { warranty: { $regex: globalFilter, $options: "i" } },
        
      ];
    }

    // column filteration
    filters.forEach((filter) => {
        matchQuery[filter.id] = { $regex: filter.value, $options: "i" };
      
    });

    // sorting
    let sortQuery = {};
    sorting.forEach((sort) => {
      sortQuery[sort.id] = sort.desc ? -1 : 1;
    });

    // aggregate pipeline
    const aggregatePipeline = [
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryData",
        },
      },
      {
        $unwind: {
          path: "$categoryData",
          preserveNullAndEmptyArrays: true,
        },
      },
      { $match: matchQuery },
      { $sort: Object.keys(sortQuery).length ? sortQuery : { createdAt: -1 } },
      { $skip: start },
      { $limit: size },
      {
        $project: {
          _id: 1,
          name: 1,
          slug: 1,
          category: "$categoryData.name",
          brand: 1,
          productType: 1,
          usageInstructions: 1,
          material: 1,
          ageGroup: 1,
          status: 1,
          warranty: 1,
          createdAt: 1,
          updatedAt: 1,
          deletedAt: 1,
        },
      },
    ];

    // execute query
    const getProduct = await ProductModel.aggregate(aggregatePipeline);

    // get total row
    const totalRowCount = await ProductModel.countDocuments(matchQuery);

    return NextResponse.json({
      success: true,
      data: getProduct,
      meta: { totalRowCount },
    });
  } catch (error) {
    return catchError(error);
  }
}
