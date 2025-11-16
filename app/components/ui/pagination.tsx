"use client";
import * as React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";

import { cn } from "./utils";
import { Button, buttonVariants } from "./button";

// ---------- Pagination Root ----------
function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

// ---------- Pagination Content ----------
function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
}

// ---------- Pagination Item ----------
function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

// ---------- Pagination Link ----------
type PaginationLinkProps = {
  isActive?: boolean;
  size?: "default" | "sm" | "lg" | "icon"; // ✅ explicitly typed sizes
} & React.ComponentProps<"a">;

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        className
      )}
      {...props}
    />
  );
}

// ---------- Pagination Previous ----------
function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default" // ✅ no type error now
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
    >
      <ChevronLeftIcon className="h-4 w-4" />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  );
}

// ---------- Pagination Next ----------
function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default" // ✅ also fine
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRightIcon className="h-4 w-4" />
    </PaginationLink>
  );
}

// ---------- Pagination Ellipsis ----------
function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

// ---------- Exports ----------
export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};



// import * as React from "react";
// import {
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   MoreHorizontalIcon,
// } from "lucide-react";

// import { cn } from "./utils";
// import { Button, buttonVariants } from "./button";

// // ---------- Pagination Root ----------
// function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
//   return (
//     <nav
//       role="navigation"
//       aria-label="pagination"
//       data-slot="pagination"
//       className={cn("mx-auto flex w-full justify-center", className)}
//       {...props}
//     />
//   );
// }

// // ---------- Pagination Content ----------
// function PaginationContent({
//   className,
//   ...props
// }: React.ComponentProps<"ul">) {
//   return (
//     <ul
//       data-slot="pagination-content"
//       className={cn("flex flex-row items-center gap-1", className)}
//       {...props}
//     />
//   );
// }

// // ---------- Pagination Item ----------
// function PaginationItem({ ...props }: React.ComponentProps<"li">) {
//   return <li data-slot="pagination-item" {...props} />;
// }

// // ---------- Pagination Link ----------
// type PaginationLinkProps = {
//   isActive?: boolean;
// } & Pick<React.ComponentProps<typeof Button>, "size"> &
//   React.ComponentProps<"a">;

// function PaginationLink({
//   className,
//   isActive,
//   size = "icon",
//   ...props
// }: PaginationLinkProps) {
//   return (
//     <a
//       aria-current={isActive ? "page" : undefined}
//       data-slot="pagination-link"
//       data-active={isActive}
//       className={cn(
//         buttonVariants({
//           variant: isActive ? "outline" : "ghost",
//           size,
//         }),
//         className
//       )}
//       {...props}
//     />
//   );
// }

// // ---------- Pagination Previous ----------
// function PaginationPrevious({
//   className,
//   ...props
// }: React.ComponentProps<typeof PaginationLink>) {
//   return (
//     <PaginationLink
//       aria-label="Go to previous page"
//       size="default"
//       className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
//       {...props}
//     >
//       <ChevronLeftIcon className="h-4 w-4" />
//       <span className="hidden sm:block">Previous</span>
//     </PaginationLink>
//   );
// }

// // ---------- Pagination Next ----------
// function PaginationNext({
//   className,
//   ...props
// }: React.ComponentProps<typeof PaginationLink>) {
//   return (
//     <PaginationLink
//       aria-label="Go to next page"
//       size="default"
//       className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
//       {...props}
//     >
//       <span className="hidden sm:block">Next</span>
//       <ChevronRightIcon className="h-4 w-4" />
//     </PaginationLink>
//   );
// }

// // ---------- Pagination Ellipsis ----------
// function PaginationEllipsis({
//   className,
//   ...props
// }: React.ComponentProps<"span">) {
//   return (
//     <span
//       aria-hidden
//       data-slot="pagination-ellipsis"
//       className={cn("flex size-9 items-center justify-center", className)}
//       {...props}
//     >
//       <MoreHorizontalIcon className="size-4" />
//       <span className="sr-only">More pages</span>
//     </span>
//   );
// }

// // ---------- Exports ----------
// export {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationPrevious,
//   PaginationNext,
//   PaginationEllipsis,
// };



// import * as React from "react";
// import {
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   MoreHorizontalIcon,
// } from "lucide-react";

// import { cn } from "./utils";
// import { Button, buttonVariants } from "./button";

// function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
//   return (
//     <nav
//       role="navigation"
//       aria-label="pagination"
//       data-slot="pagination"
//       className={cn("mx-auto flex w-full justify-center", className)}
//       {...props}
//     />
//   );
// }

// function PaginationContent({
//   className,
//   ...props
// }: React.ComponentProps<"ul">) {
//   return (
//     <ul
//       data-slot="pagination-content"
//       className={cn("flex flex-row items-center gap-1", className)}
//       {...props}
//     />
//   );
// }

// function PaginationItem({ ...props }: React.ComponentProps<"li">) {
//   return <li data-slot="pagination-item" {...props} />;
// }

// type PaginationLinkProps = {
//   isActive?: boolean;
// } & Pick<React.ComponentProps<typeof Button>, "size"> &
//   React.ComponentProps<"a">;

// function PaginationLink({
//   className,
//   isActive,
//   size = "icon",
//   ...props
// }: PaginationLinkProps) {
//   return (
//     <a
//       aria-current={isActive ? "page" : undefined}
//       data-slot="pagination-link"
//       data-active={isActive}
//       className={cn(
//         buttonVariants({
//           variant: isActive ? "outline" : "ghost",
//           size,
//         }),
//         className,
//       )}
//       {...props}
//     />
//   );
// }
// function PaginationPrevious({
//   className,
//   ...props
// }: React.ComponentProps<typeof PaginationLink>) {
//   return (
//     <PaginationLink
//       aria-label="Go to previous page"
//       size="default" // ✅ valid: "default" or "icon" (matches shadcn button sizes)
//       className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
//       {...props}
//     >
//       <ChevronLeftIcon className="h-4 w-4" /> {/* ✅ icon sized properly */}
//       <span className="hidden sm:block">Previous</span>
//     </PaginationLink>
//   );
// }

// function PaginationNext({
//   className,
//   ...props
// }: React.ComponentProps<typeof PaginationLink>) {
//   return (
//     <PaginationLink
//       aria-label="Go to next page"
//       size="default" // ✅ valid size
//       className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
//       {...props}
//     >
//       <span className="hidden sm:block">Next</span>
//       <ChevronRightIcon className="h-4 w-4" /> {/* ✅ same styling */}
//     </PaginationLink>
//   );
// }


// function PaginationPrevious({
//   className,
//   ...props
// }: React.ComponentProps<typeof PaginationLink>) {
//   return (
//     <PaginationLink
//       aria-label="Go to previous page"
//       size="default"
//       className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
//       {...props}
//     >
//       <ChevronLeftIcon />
//       <span className="hidden sm:block">Previous</span>
//     </PaginationLink>
//   );
// }

// function PaginationNext({
//   className,
//   ...props
// }: React.ComponentProps<typeof PaginationLink>) {
//   return (
//     <PaginationLink
//       aria-label="Go to next page"
//       size="default"
//       className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
//       {...props}
//     >
//       <span className="hidden sm:block">Next</span>
//       <ChevronRightIcon />
//     </PaginationLink>
//   );
// }

// function PaginationEllipsis({
//   className,
//   ...props
// }: React.ComponentProps<"span">) {
//   return (
//     <span
//       aria-hidden
//       data-slot="pagination-ellipsis"
//       className={cn("flex size-9 items-center justify-center", className)}
//       {...props}
//     >
//       <MoreHorizontalIcon className="size-4" />
//       <span className="sr-only">More pages</span>
//     </span>
//   );
// }

// export {
//   Pagination,
//   PaginationContent,
//   PaginationLink,
//   PaginationItem,
//   PaginationPrevious,
//   PaginationNext,
//   PaginationEllipsis,
// };
