-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "coursename" TEXT NOT NULL,
    "thumbnails" TEXT,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Folder" (
    "id" SERIAL NOT NULL,
    "folderName" TEXT NOT NULL,
    "courseid" INTEGER NOT NULL,

    CONSTRAINT "Folder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Videos" (
    "id" SERIAL NOT NULL,
    "folderid" INTEGER NOT NULL,
    "videolink" TEXT NOT NULL,
    "thumbnail" TEXT,

    CONSTRAINT "Videos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_courseid_fkey" FOREIGN KEY ("courseid") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Videos" ADD CONSTRAINT "Videos_folderid_fkey" FOREIGN KEY ("folderid") REFERENCES "Folder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
