-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 05, 2023 at 10:59 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `blog-akasa`
--

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `likes` int(11) DEFAULT 0,
  `image_path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `title`, `content`, `tags`, `likes`, `image_path`, `created_at`) VALUES
(42, 'Akasa Air', 'Akasa Air, a brand of SNV Aviation Private Limited, is an Indian low-cost airline headquartered in Mumbai, Maharashtra, India. It was founded by Vinay Dube and Aditya Ghosh with investor Rakesh Jhunjhunwala holding a 46% stake in the airline.', 'Akasa Air, Mumbai, Aviation', 0, NULL, '2023-12-05 17:00:07'),
(44, 'Updated: AND MANAGE BLOG POSTS:', 'A. Once logged in, users should be able to create new blog posts with a title, content (max 300\nwords), and optional tags.\nB. Users should be able to view and edit their own posts.\nC. Implement a feature to allow users to delete their posts', 'CREATE, MANAGE, BLOG, POSTS', 0, NULL, '2023-12-05 17:58:54'),
(45, 'PUBLIC BLOG DISPLAY', 'A. Visitors should be able to view all published blog posts on the platform. Order can be based\r\non relevance, latest, or post categories.\r\nB. Implement a search functionality to allow users to search for blog posts based on tags or\r\nkeywords.\r\nC. Optional – Posts can be Liked/Disliked, and this should be shown to everyone.\r\nD. Optional – Users should get live updates when blog posts are made.', 'PUBLIC, BLOG, DISPLAY', 0, NULL, '2023-12-05 17:59:35'),
(46, 'Updated: USER INTERFACE AND DESIGN', 'A. Design and implement a user-friendly and responsive interface for the blogging platform with\nthe relevant pages.\nB. Use appropriate technologies and frameworks to create a visually appealing design which\nadheres to the requirements.', 'USER, INTERFACE, DESIGN', 0, NULL, '2023-12-05 18:00:07'),
(47, 'Hello', 'This is a Demo Post', 'Demo', 0, NULL, '2023-12-05 21:43:43');

-- --------------------------------------------------------

--
-- Table structure for table `reset_tokens`
--

CREATE TABLE `reset_tokens` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `last` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first`, `email`, `password`, `last`) VALUES
(26, 'Akshatha', 'a@gmail.com', '$2b$10$lIqAYY5E7nP64iIiwq1aW.gCEpIBk1XLnMT07LFYCyizsRqTMJQiy', 'HS'),
(27, 'Mohit', 'm@gmail.com', '$2b$10$lWKsdgGNWmMJsJViVyiDpe8UPsxtziw0tVJXg.6bJeSPpLkY6pQyC', 'Mehta'),
(28, 'Mohit', 'mmehta692@gmail.com', '$2b$10$wGaRA/j.1hxFwEejWM5yCuslHRkiW5sLB2kvlwZ0pZFcc8NrNyepq', 'Mehta');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reset_tokens`
--
ALTER TABLE `reset_tokens`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `reset_tokens`
--
ALTER TABLE `reset_tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
