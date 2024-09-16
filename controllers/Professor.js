const Prof = require('../models/Professor');
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// register (POST)
// ในไฟล์ที่จัดการการสมัครสมาชิกของ professor
exports.registerProf = async (req, res) => {
    const { ProfName, ProfEmail, Username, ProfPhone, Password, Prof_Faculty } = req.body;

    try {
        const hashPass = await bcrypt.hash(Password, 10);
        const prof = new Prof({
            ProfName,
            ProfEmail,
            Username,
            ProfPhone,
            Password: hashPass,
            Prof_Faculty,
        });

        const savedProf = await prof.save();

        // ส่งคืนข้อมูลที่จำเป็นรวมถึง profId
        res.status(201).json({
            ProfId: savedProf._id,
            ProfName: savedProf.ProfName,
            ProfEmail: savedProf.ProfEmail,
            ProfPhone: savedProf.ProfPhone,
            Prof_Faculty: savedProf.Prof_Faculty
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
};


// login (POST)
exports.loginProf = async (req, res) => {
    const { Username, Password } = req.body;

    try {
        // ค้นหา professor จาก Username
        const prof = await Prof.findOne({ Username });
        if (!prof) return res.status(400).send("User not found"); // แก้ไขจาก !Username เป็น !prof

        // ตรวจสอบความถูกต้องของ password
        const isMatch = await bcrypt.compare(Password, prof.Password);
        if (!isMatch) return res.status(400).send("Invalid credentials");

        // ดึงข้อมูล professor โดยไม่แสดง password
        const profs = await Prof.findOne({ Username }).select("-Password");

        // สร้าง access token
        const accessToken = jwt.sign(
            { profId: prof._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "3h" }
        );

        // สร้าง refresh token
        const refreshToken = jwt.sign(
            { profId: prof._id },
            process.env.REFRESH_TOKEN_SECRET
        );

        // ส่งข้อมูล professor และ token กลับไปยัง client
        res.json({ profs, accessToken, refreshToken });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// showProf profile (GET ALL - password)
exports.showprofileProf = async (req, res) => {
    try {
        // ค้นหาข้อมูล Professor ทั้งหมดและไม่แสดง Password
        const prof = await Prof.find().select('-Password');
        res.status(200).json(prof);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
