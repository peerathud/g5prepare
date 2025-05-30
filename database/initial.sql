USE [master]
GO
/****** Object:  Database [G5Test]    Script Date: 4/6/2025 5:06:49 PM ******/
CREATE DATABASE [G5Test]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'G5Test', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\G5Test.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'G5Test_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\G5Test_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [G5Test] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [G5Test].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [G5Test] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [G5Test] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [G5Test] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [G5Test] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [G5Test] SET ARITHABORT OFF 
GO
ALTER DATABASE [G5Test] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [G5Test] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [G5Test] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [G5Test] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [G5Test] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [G5Test] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [G5Test] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [G5Test] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [G5Test] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [G5Test] SET  DISABLE_BROKER 
GO
ALTER DATABASE [G5Test] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [G5Test] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [G5Test] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [G5Test] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [G5Test] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [G5Test] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [G5Test] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [G5Test] SET RECOVERY FULL 
GO
ALTER DATABASE [G5Test] SET  MULTI_USER 
GO
ALTER DATABASE [G5Test] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [G5Test] SET DB_CHAINING OFF 
GO
ALTER DATABASE [G5Test] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [G5Test] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [G5Test] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [G5Test] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'G5Test', N'ON'
GO
ALTER DATABASE [G5Test] SET QUERY_STORE = OFF
GO
USE [G5Test]
GO
/****** Object:  Table [dbo].[Permissions]    Script Date: 4/6/2025 5:06:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Permissions](
	[permissionId] [varchar](20) NOT NULL,
	[permissionName] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Permissions_1] PRIMARY KEY CLUSTERED 
(
	[permissionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Roles]    Script Date: 4/6/2025 5:06:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Roles](
	[roleId] [varchar](10) NOT NULL,
	[roleName] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Roles] PRIMARY KEY CLUSTERED 
(
	[roleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User_Permissions]    Script Date: 4/6/2025 5:06:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User_Permissions](
	[userPermissionId] [int] IDENTITY(1,1) NOT NULL,
	[userId] [varchar](20) NULL,
	[permissionId] [varchar](20) NULL,
	[isReadable] [bit] NULL,
	[isWritable] [bit] NULL,
	[isDeletable] [bit] NULL,
 CONSTRAINT [PK_User_Permissions] PRIMARY KEY CLUSTERED 
(
	[userPermissionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 4/6/2025 5:06:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[userId] [varchar](20) NOT NULL,
	[firstName] [nvarchar](20) NOT NULL,
	[lastName] [nvarchar](20) NOT NULL,
	[email] [nvarchar](50) NOT NULL,
	[phone] [varchar](10) NULL,
	[roleId] [varchar](10) NOT NULL,
	[username] [varchar](50) NOT NULL,
	[password] [varchar](255) NOT NULL,
	[createdDate] [date] NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[userId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[Permissions] ([permissionId], [permissionName]) VALUES (N'adminP', N'Admin')
INSERT [dbo].[Permissions] ([permissionId], [permissionName]) VALUES (N'employeeP', N'Employee')
INSERT [dbo].[Permissions] ([permissionId], [permissionName]) VALUES (N'loremipsumP', N'Lorem Ipsum')
INSERT [dbo].[Permissions] ([permissionId], [permissionName]) VALUES (N'superadminP', N'Super Admin')
GO
INSERT [dbo].[Roles] ([roleId], [roleName]) VALUES (N'admin', N'Admin')
INSERT [dbo].[Roles] ([roleId], [roleName]) VALUES (N'employee', N'Employee')
INSERT [dbo].[Roles] ([roleId], [roleName]) VALUES (N'loremipsum', N'Lorem Ipsum')
INSERT [dbo].[Roles] ([roleId], [roleName]) VALUES (N'superadmin', N'Super Admin')
GO
SET IDENTITY_INSERT [dbo].[User_Permissions] ON 

INSERT [dbo].[User_Permissions] ([userPermissionId], [userId], [permissionId], [isReadable], [isWritable], [isDeletable]) VALUES (2, N'superadmin101', N'superadminP', 1, 1, 0)
INSERT [dbo].[User_Permissions] ([userPermissionId], [userId], [permissionId], [isReadable], [isWritable], [isDeletable]) VALUES (12, N'employee1', N'adminP', 1, 0, 1)
INSERT [dbo].[User_Permissions] ([userPermissionId], [userId], [permissionId], [isReadable], [isWritable], [isDeletable]) VALUES (13, N'test1', N'loremipsumP', 1, 0, 1)
INSERT [dbo].[User_Permissions] ([userPermissionId], [userId], [permissionId], [isReadable], [isWritable], [isDeletable]) VALUES (14, N'employee2', N'employeeP', 1, 0, 0)
INSERT [dbo].[User_Permissions] ([userPermissionId], [userId], [permissionId], [isReadable], [isWritable], [isDeletable]) VALUES (16, N'superadmin2', N'superadminP', 1, 1, 1)
INSERT [dbo].[User_Permissions] ([userPermissionId], [userId], [permissionId], [isReadable], [isWritable], [isDeletable]) VALUES (17, N'testtest', N'loremipsumP', 1, 0, 1)
SET IDENTITY_INSERT [dbo].[User_Permissions] OFF
GO
INSERT [dbo].[Users] ([userId], [firstName], [lastName], [email], [phone], [roleId], [username], [password], [createdDate]) VALUES (N'employee1', N'peerathud', N'poungnil', N'pp0847741146@hotmail.com', N'0847741146', N'admin', N'em123', N'$2a$11$DJeY5FncYblEYj9UVsff6.i1mDdz3V87zjrfq0/hO7L4oyF71DRwK', CAST(N'2025-04-03' AS Date))
INSERT [dbo].[Users] ([userId], [firstName], [lastName], [email], [phone], [roleId], [username], [password], [createdDate]) VALUES (N'employee2', N'em2', N'em2', N'em2@gmail.com', N'0847741147', N'employee', N'em223', N'$2a$11$ofSrMA2hC59jvY7e64uy6Orw9oHl2Sgx1WpmqjjEl.cOzsUylkGhi', CAST(N'2025-04-04' AS Date))
INSERT [dbo].[Users] ([userId], [firstName], [lastName], [email], [phone], [roleId], [username], [password], [createdDate]) VALUES (N'superadmin101', N'edit2', N'edit2', N'edit2@gmail.com', N'0123456789', N'superadmin', N'edit2', N'$2a$11$Lb/HPnq07eUrDTOYa4PO7uF2pqRdPwiipn70HIh44xDwEQ3Ma6dce', CAST(N'2025-04-04' AS Date))
INSERT [dbo].[Users] ([userId], [firstName], [lastName], [email], [phone], [roleId], [username], [password], [createdDate]) VALUES (N'superadmin2', N'SpName', N'SplastName', N'sup2@gmail.com', N'0847741141', N'superadmin', N'sup223', N'$2a$11$JwzKfNl.922/yFgxbvgcEudU8XMpDkot9H7nU8iY6zR0Fqtw4msDe', CAST(N'2025-04-05' AS Date))
INSERT [dbo].[Users] ([userId], [firstName], [lastName], [email], [phone], [roleId], [username], [password], [createdDate]) VALUES (N'test1', N'testName', N'testName', N'test@gmail.com', N'0847462545', N'loremipsum', N'testUsername', N'$2a$11$Y3MPtCeJnHCYqjOMCNDx8.wNSRHB3Y2DFGBfp0suYKWruh5Jx1qcS', CAST(N'2025-04-04' AS Date))
INSERT [dbo].[Users] ([userId], [firstName], [lastName], [email], [phone], [roleId], [username], [password], [createdDate]) VALUES (N'testtest', N'testtest', N'testtest', N'testtest@gmail.com', N'0847741143', N'loremipsum', N'testtest', N'$2a$11$OZJkGdB2KQ6nyx7rQ31qTOQxCCt0aeEcnH6QXJpN4ao1ECgZhlqgy', CAST(N'2025-04-05' AS Date))
GO
ALTER TABLE [dbo].[User_Permissions]  WITH CHECK ADD  CONSTRAINT [FK_User_Permissions_Permissions] FOREIGN KEY([permissionId])
REFERENCES [dbo].[Permissions] ([permissionId])
GO
ALTER TABLE [dbo].[User_Permissions] CHECK CONSTRAINT [FK_User_Permissions_Permissions]
GO
ALTER TABLE [dbo].[User_Permissions]  WITH CHECK ADD  CONSTRAINT [FK_User_Permissions_Users] FOREIGN KEY([userId])
REFERENCES [dbo].[Users] ([userId])
GO
ALTER TABLE [dbo].[User_Permissions] CHECK CONSTRAINT [FK_User_Permissions_Users]
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK_Users_Roles] FOREIGN KEY([roleId])
REFERENCES [dbo].[Roles] ([roleId])
GO
ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [FK_Users_Roles]
GO
USE [master]
GO
ALTER DATABASE [G5Test] SET  READ_WRITE 
GO
