import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AvatarImagePlaceholder from "@/public/assets/images/img-placeholder.webp";
import { TiStarFullOutline } from "react-icons/ti";

const LatestReview = () => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Rating</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 10 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={AvatarImagePlaceholder.src} />
                </Avatar>
                <span className="line-clamp-1">Lorem, ipsum dolor.</span>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span>
                      {" "}
                      <TiStarFullOutline className="text-yellow-500" />{" "}
                    </span>
                  ))}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LatestReview;
