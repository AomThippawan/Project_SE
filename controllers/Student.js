const Stu = require('../models/Student');
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// register Student (POST)
exports.registerstd = async (req, res) => {
    const {
        Name,
        Email,
        Username,
        Phone,
        Password,
        Faculty,
        Program,
        Sex,
        Year_of_study
    } = req.body;

    try {
        // เข้ารหัสรหัสผ่าน
        const hashPass = await bcrypt.hash(Password, 10);

        // สร้าง object สำหรับ Student ใหม่
        const stu = new Stu({
            Name,
            Email,
            Username,
            Phone,
            Password: hashPass,
            Faculty,
            Program,
            Sex,
            Year_of_study
        });

        // บันทึกข้อมูลนักเรียนในฐานข้อมูล
        await stu.save();
        const stud = await Stu.findOne({ Username }).select("-Password");
        res.status(201).json({
            message: "User registered successfully",
            stud,  // ส่งข้อมูลนักเรียนกลับไป (ยกเว้น Password)
        });("User registered");
        
        console.log({ stu });
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// login Student (POST)
exports.loginstu = async (req, res) => {
    const { Username, Password } = req.body;

    try {
        // ค้นหานักเรียนจาก Username
        const stu = await Stu.findOne({ Username });

        if (!stu) return res.status(400).send("User not found");

        // ตรวจสอบรหัสผ่าน
        const isMatch = await bcrypt.compare(Password, stu.Password);
        if (!isMatch) return res.status(400).send("Invalid credentials");

        // ไม่ต้องส่งข้อมูล Password กลับไป
        const stud = await Stu.findOne({ Username }).select("-Password");

        // สร้าง access token
        const accessTokenSTU = jwt.sign(
            { stuId: stu._id },
            process.env.ACCESS_TOKEN_SECRET_STU,
            { expiresIn: "3h" }
        );

        // สร้าง refresh token
        const refreshTokenSTU = jwt.sign(
            { stuId: stu._id },
            process.env.REFRESH_TOKEN_SECRET_STU
        );

        // ส่งข้อมูล student และ token กลับไปยัง client
        res.json({ stud, accessTokenSTU, refreshTokenSTU });

    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Show Profile Student (GET)
exports.showprofilestu = async (req, res) => {
    try {
        // ค้นหาข้อมูลนักเรียนทั้งหมดและไม่แสดง Password
        const stu = await Stu.find().select('-Password');
        res.status(200).json(stu);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
