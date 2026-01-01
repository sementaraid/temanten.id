-- CreateTable
CREATE TABLE "Version" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "version" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Invitation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "brideFullName" TEXT NOT NULL,
    "brideNickname" TEXT,
    "brideBirthOrder" TEXT,
    "brideFather" TEXT,
    "brideMother" TEXT,
    "brideInstagram" TEXT,
    "groomFullName" TEXT NOT NULL,
    "groomNickname" TEXT,
    "groomBirthOrder" TEXT,
    "groomFather" TEXT,
    "groomMother" TEXT,
    "groomInstagram" TEXT,
    "ceremonyName" TEXT NOT NULL DEFAULT 'Akad Nikah',
    "ceremonyDate" TEXT NOT NULL,
    "ceremonyTime" TEXT NOT NULL,
    "ceremonyLocationName" TEXT,
    "ceremonyAddress" TEXT,
    "ceremonyMapsUrl" TEXT,
    "receptionName" TEXT NOT NULL DEFAULT 'Resepsi',
    "receptionDate" TEXT NOT NULL,
    "receptionTime" TEXT NOT NULL,
    "receptionLocationName" TEXT,
    "receptionAddress" TEXT,
    "receptionMapsUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "GuestList" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'unknown',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "GuestResponses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "confirmation" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Invitation_slug_key" ON "Invitation"("slug");
