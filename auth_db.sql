-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 30, 2024 at 06:10 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `auth_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `friends`
--

CREATE TABLE `friends` (
  `user_id` int(11) DEFAULT NULL,
  `friend_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `otp` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `age`, `email`, `password`, `otp`) VALUES
(1, 'abc', 12, 'wesesal536@aiworldx.com', '$2a$10$LhVabSiyTdLp61eLFRYimORbnEqYfrJAUu9BzDfi8Xkyu.4KCBc6G', '998147'),
(2, 'Naziya ', 10, 'bareqako@teleg.eu', '$2a$10$1Y1QKi3X31WnKdL8XUVqW.CsIAugN9B5lb/gqOlnPJfIs9UFefG8G', '344152'),
(3, 'Naziya Begum', 20, 'vafyqufe@logsmarter.net', '$2a$10$1sTt4diTPHYSHDl7uKQOWu8heE7k4owYEjh6rcNeYA4lAknidGZ82', '558087'),
(4, 'test', 20, 'zemiry@teleg.eu', '$2a$10$kyID8aF1zF/xc0QuJRT6KuRio52se1g3aLxSKefzV2BFG7A/Yzpsm', '128151'),
(6, 'test2', 9, 'k9332380@gmail.com', '$2a$10$j5.JQsIItot7G386VO2TKOUVbqDNsnAUvI97rOWh.H4J46oiHRSfS', '255725'),
(7, 'nazia', 2, 'missnaziya10@gmail.com', '$2a$10$Jksc562eybTNzrjYGF5yWeR6VMYFbW2LhlklRNsVXqRA399w1rqSe', '851413'),
(8, 'abc', 123, 'xvkm9@rustyload.com', '$2a$10$uCYU5DMqhj8TBJH9JflIxO/ftP2W7sIpTdV014ZH0EKEyxpC2WDNm', NULL),
(9, 'abc', 7, 'jeh6n@rustyload.com', '$2a$10$T23ZyhUlSAYGbhXcaQxmfeHfyVs/kPo/zyrmnIsSghu0owjah3d52', NULL),
(10, 'abc', 12, 'yvu1u@rustyload.com', '$2a$10$5ZVLa99hC0zJ7CepEUI9m.PMieWbnHbYzX8n4xrWQvERZTUiqO.zC', NULL),
(11, 'abcd', 12, 'i7gt4@rustyload.com', '$2a$10$Q0DCqBrh33W0BpQLhV7jNeGCMAfis6a.QbEmRMb8Wt4FFTW3ecOqG', NULL),
(12, 'abc', 123, '2131@32.234', '$2a$10$FQ1YHFKiVFC1lTtWe5CMMuTEMLrm1cv4bcY82sX9IGPvJ06WAlffu', '118208'),
(13, 'abc', 12, 'qze2w@rustyload.com', '$2a$10$.owRnxIIR.Dtix3/KBEE/.go1eSRh8wbEsEfKV00GigQ2GpehKpaC', NULL),
(14, 'Naziya Begum', 12, 'missnaziysdsf232a24@gmail.com', '$2a$10$A/btRdHSB92o5yeFBADThOA0mIjx3mozaSsLW83LJMJxIlPFSMvBS', '420938'),
(15, 'Naziya Begum', 12, 'missnaziya3@gmail.com', '$2a$10$hMJ7tNGQ0DbPIOHA.qX1tOR/JMB5yC4FyrnQV/FVDgdlP2dvZ3UBG', '402439'),
(16, 'abc', 12, 'u0ayf@rustyload.com', '$2a$10$05cg.uGqOniRfG3EsXhL3uEHoEntpw4VXGpH2XZa7YkFClrx1AUyO', '606106'),
(17, 'test', 12, 'r21u0@rustyload.com', '$2a$10$GHPu.2.6g271mkwG3J4RCOin6pjdM8rTb8QNlSSVp1HP5IoGw8Kcm', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `friends`
--
ALTER TABLE `friends`
  ADD UNIQUE KEY `unique_friendship` (`user_id`,`friend_id`),
  ADD KEY `friend_id` (`friend_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `friends`
--
ALTER TABLE `friends`
  ADD CONSTRAINT `friends_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `friends_ibfk_2` FOREIGN KEY (`friend_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
