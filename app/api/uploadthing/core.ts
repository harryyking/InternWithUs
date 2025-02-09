import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";

const f = createUploadthing();

export const ourFileRouter: FileRouter = {
  userProfile: f({ image: { maxFileSize: "4MB", maxFileCount: 8 } })
    .middleware(async () => {
      const session = await getServerSession(authOptions);

      // Verify session exists
      if (!session?.user?.email) {
        throw new UploadThingError("Unauthorized: No session found");
      }

      const userEmail = session.user.email;

      // Query database to confirm if email matches landlord's email
      const user = await prisma.user.findUnique({
        where: { email: userEmail },
        select: {email: true},
      });

      if (!user) {
        throw new UploadThingError(
          "Unauthorized: User has not signed in!"
        );
      }

      // Return metadata for the upload
      return { userId: user.email };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);

      // Perform additional actions like storing file info in the database

      return { 
        uploadedBy: metadata.userId, 
        url: file.url, 
        name: file.name,
        key: file.key,
      };
    }),

  jobUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 8 } })
    .middleware(async () => {
      const session = await getServerSession(authOptions);

      // Verify session exists
      if (!session?.user?.email) {
        throw new UploadThingError("Unauthorized: No session found");
      }

      const userEmail = session.user.email;

      // Query database to confirm if email matches landlord's email
      const employer = await prisma.user.findUnique({
        where: { email: userEmail },
        select: {email: true},
      });

      if (!employer) {
        throw new UploadThingError(
          "Unauthorized: Your email is not associated with a landlord account"
        );
      }

      // Return metadata for the upload
      return { userId: employer.email };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);

      // Perform additional actions like storing file info in the database

      return { 
        uploadedBy: metadata.userId, 
        url: file.url, 
        name: file.name,
        key: file.key,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
