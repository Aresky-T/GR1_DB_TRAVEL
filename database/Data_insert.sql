USE `gr1_db_travel`;

INSERT INTO `account`
VALUES (
        1,
        'admin',
        '$2a$10$ANcBSwr94eat6d20icSeq.0ihY8giKyFyvEc8kI.0H19Pjh52xcou',
        'admin@gmail.com',
        'ACTIVE',
        'ADMIN',
        '2023-06-01 15:43:33',
        '2023-06-01 15:43:33'
    ), (
        2,
        'username1',
        '$2a$10$eiG3bsvVOJG.xruoGVrIKuAvR45tyoBOKsncl6sUStcUFB2vFyh3e',
        'email1@gmail.com',
        'ACTIVE',
        'USER',
        '2023-06-01 20:07:10',
        '2023-07-05 07:30:32'
    ), (
        3,
        'aresky1105',
        '$2a$10$q9VfMiIDuRWWISGQ/Pn6zOC1uYJiW6LQyCNV0vMZv8ssiENFezEfW',
        'tn6354103@gmail.com',
        'ACTIVE',
        'USER',
        '2023-06-02 22:08:35',
        '2023-07-06 16:15:17'
    ), (
        4,
        'username2',
        '$2a$10$x4WF/DFMZPVzBe.JYannEuJGveIKe5tGnV4GekspVfUaRTLN84rPO',
        'aresky1105@gmail.com',
        'BLOCKED',
        'USER',
        '2023-06-11 11:52:12',
        '2023-07-06 18:38:08'
    ), (
        5,
        'username3',
        '$2a$10$mvL7NSWezK4p4EcKVZWWi.rb78gnsGjF3dd1rkHDu0S11li6xD2ZS',
        'email3@gmail.com',
        'ACTIVE',
        'USER',
        '2023-06-11 11:55:17',
        '2023-06-11 11:55:17'
    ), (
        6,
        'username4',
        '$2a$10$sAHfEFFFSh5u0AwB95pbmubKVWgyrg/mtYDpFGAEAYGqgcR4i1.ES',
        'email4@gmail.com',
        'BLOCKED',
        'USER',
        '2023-06-11 11:56:05',
        '2023-07-05 07:30:28'
    ), (
        7,
        'username5',
        '$2a$10$OznrgaFkjbm7GyuWVU.z5uQVobwKNkF1umFtc4DhfOHlojBHUpKRy',
        'email5@gmail.com',
        'ACTIVE',
        'USER',
        '2023-06-11 11:57:36',
        '2023-06-11 11:57:36'
    ), (
        8,
        'username6',
        '$2a$10$Vv9zBB07Wu84cmY8WSZfKORH0TuQ/gFMUKlQtZGlSOyU4wpuSnhB.',
        'email6@gmail.com',
        'ACTIVE',
        'USER',
        '2023-06-11 11:58:04',
        '2023-06-11 11:58:04'
    ), (
        9,
        'username7',
        '$2a$10$KabQK1fwgtLNQUh7IV1HBOkT5KA62GM6zo0WYluymi9urPmfY.z/.',
        'email7@gmail.com',
        'ACTIVE',
        'USER',
        '2023-06-11 11:59:09',
        '2023-06-11 11:59:09'
    ), (
        10,
        'anhtuan2000',
        '$2a$10$mnjRgrjC7L5UMPzRK0UEheRWl8s./0u7eMh3tfTh3PBF.9PqWhTXO',
        'aresky2000@gmail.com',
        'ACTIVE',
        'USER',
        '2023-06-23 23:14:41',
        '2023-07-06 18:42:46'
    );

INSERT INTO `profile`
VALUES (
        1,
        'string',
        'string',
        'string',
        'string',
        '2023-06-03',
        'MALE',
        1
    ), (
        2,
        NULL,
        'fullname 1',
        NULL,
        NULL,
        NULL,
        NULL,
        2
    ), (
        3,
        'avatar_aresky_1105',
        'Anh Tuấn Nguyễn',
        'Hà Nội',
        '0966477078',
        '2000-05-11',
        'MALE',
        3
    ), (
        4,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        4
    ), (
        5,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        5
    ), (
        6,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        6
    ), (
        7,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        7
    ), (
        8,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        8
    ), (
        9,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        9
    ), (
        10,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        10
    );

INSERT INTO
    `tour_guide` (
        id,
        full_name,
        avatar_url,
        `description`,
        phone,
        address,
        gender,
        birth_date,
        `status`
    )
VALUES (
        1,
        'Nguyễn Anh Tuấn',
        'avatar',
        'đẹp trai, hòa đồng, nhiệt tình',
        '0941556225',
        'string',
        'MALE',
        '2000-05-11',
        'BUSY'
    ), (
        3,
        'Tuấn Anh',
        'link1',
        'dep trai',
        '0966477078',
        'Hà Nội',
        'MALE',
        '2000-11-05',
        'AVAILABLE'
    ), (
        4,
        'Nguyễn Văn Anh',
        'link',
        'Tận tụy, vui tính, hòa đồng',
        '0123456789',
        'TP.Hồ Chí Minh',
        'MALE',
        '1990-07-11',
        'BUSY'
    );

INSERT INTO
    `tour` (
        id,
        title,
        image1,
        image2,
        image3,
        image4,
        `time`,
        start_address,
        destination_list,
        available_seats,
        total_seats,
        vehicle,
        schedule_description,
        price1,
        price2,
        price3,
        tour_guide,
        tour_code,
        created_time,
        start_time,
        `status`
    )
VALUES (
        1,
        'Tour 1: Đà Lạt: Dịch vụ vé máy bay + 2 đêm nghỉ dưỡng tại khách sạn Sandals Camellia 4 sao (Đã gồm Ăn sáng)',
        'https://vietnam.travel/sites/default/files/styles/article_photo_large/public/2019-04/Dalat%20Vietnam%20Travel%20Guide-8.jpg?itok=IvlkaB3v',
        'https://gotour.com.vn/wp-content/uploads/2019/08/ho-xuan-huong-da-lat-tp-1.jpg',
        'https://metaeventtravel.vn/wp-content/uploads/2022/12/Tour-Nha-Trang-Da-Lat-5-Ngay-4-Dem.jpg',
        'https://www.danangtodaytravel.com/upload/hinhthem/tourdalattodaytravel-3462.png',
        '3 ngày 2 đêm',
        'Hà Nội',
        'Đà Lạt',
        20,
        20,
        'Máy bay',
        '<p>Chưa có lịch trình cụ thể</p>',
        4500000,
        2000000,
        200000,
        NULL,
        '4DS2BJIWQU-BKTRAVEL-1685610115800',
        '2023-05-01 14:45:35',
        '2023-07-10 08:15:30',
        'NOT_STARTED'
    ), (
        2,
        'Tour 2: Đà Lạt: Dịch vụ vé máy bay + 2 đêm nghỉ dưỡng tại khách sạn Sandals Camellia 4 sao (Đã gồm Ăn sáng)',
        'https://vietnam.travel/sites/default/files/styles/article_photo_large/public/2019-04/Dalat%20Vietnam%20Travel%20Guide-8.jpg?itok=IvlkaB3v',
        'https://gotour.com.vn/wp-content/uploads/2019/08/ho-xuan-huong-da-lat-tp-1.jpg',
        'https://metaeventtravel.vn/wp-content/uploads/2022/12/Tour-Nha-Trang-Da-Lat-5-Ngay-4-Dem.jpg',
        'https://www.danangtodaytravel.com/upload/hinhthem/tourdalattodaytravel-3462.png',
        '3 ngày 2 đêm',
        'Hà Nội',
        'Đà Lạt',
        20,
        20,
        'Xe du lịch',
        '<p>Chưa có lịch trình cụ thể</p>',
        4000000,
        2000000,
        500000,
        1,
        '4DS2BJIWQU-BKTRAVEL-1685610115801',
        '2023-05-11 14:45:35',
        '2023-07-01 07:45:30',
        'ON_GOING'
    ), (
        3,
        'Tour 3: Hà Nội - Sapa - Fansipan - Ninh Bình - Tràng An - Bái Đính - Tuyệt Tịnh Cốc - Hạ Long - Yên Tử',
        'https://media.travel.com.vn/tour/tfd_221207045206_529019.jpg',
        'https://media.travel.com.vn/tour/tfd_221207045221_161727.jpg',
        'https://media.travel.com.vn/tour/tfd_221207045229_227862.jpg',
        'https://media.travel.com.vn/tour/tfd_221207045258_917314.jpg',
        '7 ngày 6 đêm',
        'TP. Hồ Chí Minh',
        'Hà Nội, Lào Cai, Sapa, Fansipan, Bản Cát Cát, Lăng Hồ Chủ Tịch, Ninh Bình, Tràng An, Bái Đính, Hạ Long, Yên Tử',
        20,
        20,
        'Máy bay, Xe du lịch',
        '<h3>Ngày 1 - TPHCM – SB NỘI BÀI (HÀ NỘI) (Tự túc ăn ngày đầu tiên)</h3><p class=\"ql-align-justify\">Quý khách tập trung tại sân bay Tân Sơn Nhất (ga trong nước), hướng dẫn làm thủ tục cho Quý khách đáp chuyến bay đi Hà Nội. Đến sân bay Nội Bài, xe đưa quý khách về trung tâm Hà Nội nhận phòng khách sạn nghỉ ngơi.&nbsp;</p><p class=\"ql-align-right\"><strong>Nghỉ đêm tại Hà Nội.</strong></p><p class=\"ql-align-right\">&nbsp;</p><h3>Ngày 2 - HÀ NỘI – SAPA – BẢN CÁT CÁT 03 bữa ăn: (Sáng, Trưa, Chiều)</h3><p class=\"ql-align-justify\">Quý khách ăn sáng và trả phòng. Xe khởi hành đưa Quý khách đi tham quan:</p><p class=\"ql-align-justify\">-&nbsp;<strong>Lăng Hồ Chủ Tịch</strong>&nbsp;(không viếng vào thứ 2, thứ 6 hàng tuần và giai đoạn bảo trì định kì hàng năm 15/6 – 15/8) tham quan và tìm hiểu cuộc đời và sự nghiệp của vị cha già dân tộc tại&nbsp;<em>Nhà Sàn Bác Hồ, Bảo Tàng Hồ Chí Minh, Chùa Một Cột.</em></p><p class=\"ql-align-justify\">Tiếp tục hành trình, Quý khách khởi hành đi&nbsp;<a href=\"https://travel.com.vn/lao-cai/tour-sapa.aspx?utm_source=internalbl&amp;utm_medium=click&amp;utm_campaign=ATLinks\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: transparent; color: rgb(45, 66, 113);\">Sapa</a>&nbsp;theo cao tốc Hà Nội – Lào Cai. Trên đường, Quý khách dùng cơm trưa tại nhà hàng địa phương. Đến nơi, Quý khách tham quan:&nbsp;</p><p class=\"ql-align-justify\"><strong>- Bản Cát Cát</strong>&nbsp;- đẹp như một bức tranh giữa vùng phố cổ Sapa, nơi đây thu hút du khách bởi cầu treo, thác nước, guồng nước và những mảng màu hoa mê hoặc du khách khi lạc bước đến đây. Thăm những nếp nhà của người Mông, Dao, Giáy trong bản, du khách sẽ không khỏi ngỡ ngàng trước vẻ đẹp mộng mị của một trong những ngôi làng cổ đẹp nhất Sapa.</p><p class=\"ql-align-justify\">Quý khách dùng cơm tối và nhận phòng nghỉ ngơi hoặc tự do dạo phố ngắm<strong>&nbsp;nhà thờ Đá Sapa,</strong>&nbsp;tự do thưởng thức đặc sản vùng cao như:&nbsp;<strong>thịt lợn cắp nách nướng, trứng nướng, rượu táo mèo, giao lưu với người dân tộc vùng cao.</strong></p><p class=\"ql-align-right\"><strong>Nghỉ đêm tại Sapa</strong></p><h3>Ngày 3 - SAPA – FANSIPAN LEGEND – ĐÈO Ô QUY HỒ 03 bữa ăn: (Sáng, Trưa, Chiều)</h3><p class=\"ql-align-justify\">Quý khách dùng điểm tâm sáng tại khách sạn. xe đưa đoàn ra ga&nbsp;<a href=\"https://travel.com.vn/lao-cai/tour-sapa.aspx?utm_source=internalbl&amp;utm_medium=click&amp;utm_campaign=ATLinks\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: transparent; color: rgb(45, 66, 113);\">Sapa</a>, Quý khách trải nghiệm đến<strong>&nbsp;khu&nbsp;</strong><a href=\"https://travel.com.vn/?utm_source=internalbl&amp;utm_medium=click&amp;utm_campaign=ATLinks\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: transparent; color: rgb(45, 66, 113);\"><strong>du lịch</strong></a><strong>&nbsp;Fansipan Legend bằng Tàu hỏa leo núi Mường Hoa&nbsp;</strong>hiện đại nhất Việt Nam với tổng chiều dài gần 2000m, thưởng ngoạn bức tranh phong cảnh đầy màu sắc của cánh rừng nguyên sinh, thung lũng Mường Hoa.</p><p class=\"ql-align-justify\"><strong>- Chinh phục đỉnh núi Fansipan&nbsp;</strong>với độ cao 3.143m hùng vĩ bằng cáp treo (chi phí tự túc).&nbsp;</p><p class=\"ql-align-justify\">- Lễ Phật tại&nbsp;<strong>chùa Trình&nbsp;</strong>hay cầu phúc lộc, bình an cho gia đình tại Bích Vân Thiền Tự trong hệ thống cảnh quan tâm linh trên đỉnh Fansipan.&nbsp;&nbsp;&nbsp;</p><p class=\"ql-align-justify\">Tiếp tục hành trình, Quý khách dùng cơm trưa và tham quan:&nbsp;</p><p class=\"ql-align-justify\">- Chinh phục<strong>&nbsp;đèo Ô Quy Hồ&nbsp;</strong>- con đèo đẹp, hùng vĩ và dài nhất trong Tứ Đại Đỉnh Đèo miền Bắc.</p><p class=\"ql-align-justify\">- Khu du lịch&nbsp;<strong>Cổng Trời Ô Quy Hồ -</strong>&nbsp;một trong những điểm săn mây, ngắm hoàng hôn cực đẹp tại Sapa.</p><p class=\"ql-align-justify\">Quý khách dùng cơm tối tại Sapa và tự do nghỉ ngơi.</p><p class=\"ql-align-right\"><strong>Nghỉ đêm tại Sapa.</strong></p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\"><strong style=\"color: rgb(255, 0, 0);\">Lưu ý: Trong trường hợp, Fansipan không hoạt động chương trình sẽ được thay thế bằng điểm tham quan Cầu Kính Rồng Mây (không bao gồm vé tham quan).</strong></p><p class=\"ql-align-justify\">&nbsp;</p><h3>Ngày 4 - SAPA – LÀO CAI – HÀ NỘI 03 bữa ăn: (Sáng, Trưa, Chiều)</h3><p class=\"ql-align-justify\">Quý khách ăn sáng và trả phòng khách sạn. Xe khởi hành đưa Quý khách về Hà Nội, trên đường dừng tham quan mua sắm tại&nbsp;<em>Siêu thị Du lịch nông nghiệp Ocop Phú Thọ - chợ Tp Việt Trì</em>&nbsp;và dùng cơm trưa tại nhà hàng địa phương. Đến Hà Nội nhận phòng khách sạn nghỉ ngơi hoặc tự do đi tham quan&nbsp;<a href=\"https://travel.com.vn/ha-noi/tour-ho-hoan-kiem.aspx?utm_source=internalbl&amp;utm_medium=click&amp;utm_campaign=ATLinks\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: transparent; color: rgb(45, 66, 113);\"><strong>Hồ Hoàn Kiếm</strong></a><strong>&nbsp;</strong>ngắm bên ngoài&nbsp;<strong>Tháp Rùa,&nbsp;</strong><a href=\"https://travel.com.vn/ha-noi/tour-den-ngoc-son.aspx?utm_source=internalbl&amp;utm_medium=click&amp;utm_campaign=ATLinks\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: transparent; color: rgb(45, 66, 113);\"><strong>Đền Ngọc Sơn</strong></a><strong>,&nbsp;</strong><a href=\"https://travel.com.vn/ha-noi/tour-cau-the-huc.aspx?utm_source=internalbl&amp;utm_medium=click&amp;utm_campaign=ATLinks\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: transparent; color: rgb(45, 66, 113);\"><strong>Cầu Thê Húc</strong></a><strong>.</strong></p><p class=\"ql-align-right\"><strong>Nghỉ đêm tại Hà Nội.&nbsp;</strong></p><h3>Ngày 5 - HÀ NỘI - YỂN TỬ - HẠ LONG 03 Bữa ăn: (Sáng, Trưa, Chiều)</h3><p class=\"ql-align-justify\">Quý khách ăn sáng và trả phòng. Xe khởi hành đưa Quý khách đến thành phố biển&nbsp;<strong>Hạ Lon</strong>g theo quốc lộ 18, trên đường dừng ăn trưa và tham quan&nbsp;<strong>vùng đất thiêng Yên Tử:&nbsp;</strong></p><p class=\"ql-align-justify\">-&nbsp;&nbsp;&nbsp;<strong>Lưu giữ những bức ảnh đẹp tại Làng Nương&nbsp;</strong>và dùng bữa trưa tại Cơm Quê&nbsp;</p><p class=\"ql-align-justify\">-&nbsp;&nbsp;Quý khách&nbsp;<strong>lên cáp treo du ngoạn thắng cảnh thiên nhiên Đông Yên Tử</strong>&nbsp;(chi phí cáp treo tự túc), nơi còn lưu giữ nhiều di tích lịch sử mệnh danh “Đất tổ Phật giáo Việt Nam”, chiêm bái chùa Một Mái, chùa Hoa Yên – nơi tu hành của phật hoàng Trần Nhân Tông khai sinh ra dòng mới Thiền Phái Trúc Lâm, nằm trên lưng chừng núi ở độ cao 516m. Theo dấu chân Phật Hoàng viếng Chùa Đồng có tên Thiên Trúc Tự (chùa Cõi Phật), tọa lạc ở đỉnh cao nhất dãy Yên Tử (1.068m) – ngôi chùa bằng đồng lớn nhất Việt Nam.</p><p class=\"ql-align-justify\">Đến Hạ Long, Quý khách tham quan mua sắm tại&nbsp;<strong>Trung tâm Mỹ Ngọc</strong>-&nbsp;<em>Trung tâm Ngọc trai lớn nhất miền bắc Việt Nam.Tới đây Quý khách chiêm ngưỡng vẻ đẹp sang trọng, đủ các màu sắc hấp dẫn của những viên ngọc trai được nuôi trong lòng Di sản – Kỳ quan thiên nhiên thế giới vịnh Hạ Long tại phòng trưng bày sản phẩm. Quý khách có thể lựa chọn cho mình và người thân những đồ trang sức ngọc trai Hạ Long như ý và những sản phẩm lưu niệm được chế tác từ vỏ trai, sản phẩm đạt chất lượng Occop 5 sao cấp Quốc gia đầu tiên của Việt Nam.</em></p><p class=\"ql-align-justify\">Dùng cơm chiều và nhận phòng khách sạn nghỉ nghơi. Buổi tối,&nbsp;<em>Quý khách tự do khám phá nhiều hoạt động dịch vụ giải trí sôi nổi tại “phố cổ” Bãi Cháy - nằm cạnh công viên Sun World Hạ Long từ những ẩm thực đường phố đến các quán cà phê siêu dễ thương như Hòn Gai Coffee &amp; Lounge hay thoải mái bung xõa tại The Mini Bar, Brothers Pub,…</em></p><p class=\"ql-align-right\"><strong>Nghỉ đêm tại Hạ Long.&nbsp;</strong></p><p class=\"ql-align-right\">&nbsp;</p><h3>Ngày 6 - HẠ LONG – NINH BÌNH 03 Bữa ăn: (Sáng, Trưa, Chiều)</h3><p class=\"ql-align-justify\">Quý khách ăn sáng và trả phòng khách sạn. Xe đưa quý khách ra bến tàu, xuống thuyền du ngoạn<strong>&nbsp;</strong><a href=\"https://travel.com.vn/quang-ninh/tour-vinh-ha-long.aspx?utm_source=internalbl&amp;utm_medium=click&amp;utm_campaign=ATLinks\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: transparent; color: rgb(45, 66, 113);\"><strong>Vịnh Hạ Long</strong></a><strong>&nbsp;</strong>- Thắng cảnh thiên nhiên tuyệt đẹp và vô cùng sống động, được UNESCO công nhận là di sản thiên nhiên Thế giới năm 1994.</p><p class=\"ql-align-justify\">-&nbsp;<strong>Động Thiên Cung</strong>&nbsp;là một trong những động đẹp nhất ở Hạ Long. Vẻ đẹp nguy nga và lộng lẫy bởi những lớp thạch nhũ và những luồng ánh sáng lung linh.</p><p class=\"ql-align-justify\">- Từ trên tàu ngắm nhìn các hòn đảo lớn nhỏ trong Vịnh Hạ Long:&nbsp;<strong>Hòn Gà Chọi, Hòn Lư Hương.</strong></p><p class=\"ql-align-justify\">Xe đón Quý khách tại bến thuyền khởi hành đi&nbsp;<strong>Ninh Bình</strong>&nbsp;<em>- vùng đất mệnh danh là “Nơi mơ đến, chốn mong về” với nhiều di tích văn hóa, thiên nhiên vô cùng đặc sắc.</em></p><p class=\"ql-align-justify\">-&nbsp;<strong>Tuyệt Tịnh Cốc</strong>: nằm giữa mảnh đất cố đô Hoa Lư (Ninh Bình), nơi đây có động Am Tiên ẩn mình giữa lưng chừng núi và còn được mệnh danh là “thiên đường nơi hạ giới”.</p><p class=\"ql-align-justify\">Buổi tối quý khách tự do&nbsp;<strong>khám phá Phố cổ Hoa Lư</strong>, một không gian check-in cổ, đẹp, trầm mặc đẹp trở nên lung linh, huyền ảo hơn với sắc màu của những chiếc đèn lồng và Bảo Tháp trên Hồ Kỳ Lân; trải nghiệm nhiều hoạt động trò chơi dân gian và nhiều loại hình văn hóa nghệ thuật từ dân tộc như múa rối nước, nhảy múa Tắc Xình, hát xẩm, ... đến những buổi trình diễn acoustic sẽ được diễn ra vào các buổi tối ngày cuối tuần.</p><p class=\"ql-align-right\"><strong>Nghỉ đêm tại Ninh Bình.</strong></p><p class=\"ql-align-right\">&nbsp;</p><h3>Ngày 7 - NINH BÌNH - SB NỘI BÀI 02 Bữa ăn: (Sáng, Trưa)</h3><p class=\"ql-align-justify\">Quý khách ăn sáng và trả phòng khách sạn. Xe đưa quý khách tham quan:</p><p class=\"ql-align-justify\"><strong>- Khu Du Lịch&nbsp;</strong><a href=\"https://travel.com.vn/ninh-binh/tour-trang-an.aspx?utm_source=internalbl&amp;utm_medium=click&amp;utm_campaign=ATLinks\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: transparent; color: rgb(45, 66, 113);\"><strong>Tràng An</strong></a>: Quý khách lên thuyền truyền thống đi tham quan thắng cảnh hệ thống núi đá vôi hùng vĩ và các thung lũng ngập nước, thông với nhau bởi các dòng suối tạo nên các hang động ngập nước quanh năm. Điểm xuyến trong không gian hoang sơ, tĩnh lặng là hình ảnh rêu phong, cổ kính của các mái đình, đền, phủ nằm nép mình dưới chân các dãy núi cao.</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\"><strong>-&nbsp;&nbsp;</strong><a href=\"https://travel.com.vn/ninh-binh/tour-chua-bai-dinh.aspx?utm_source=internalbl&amp;utm_medium=click&amp;utm_campaign=ATLinks\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: transparent; color: rgb(45, 66, 113);\"><strong>Chùa Bái Đính</strong></a><strong>,</strong>&nbsp;một quần thể chùa với nhiều kỷ lục Việt Nam như pho tượng phật Di Lặc bằng đồng nặng 80 tấn, hành lang với 500 tượng vị La Hán, tòa Bảo Tháp cao 99m…&nbsp;</p><p class=\"ql-align-justify\">Tiếp tục hành trình, xe khởi hành đưa Quý khách ra sân bay Nội Bài làm thủ tục đón chuyến bay về Tp.HCM. Chia tay Quý khách và kết thúc chương trình&nbsp;<a href=\"https://travel.com.vn/?utm_source=internalbl&amp;utm_medium=click&amp;utm_campaign=ATLinks\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: transparent; color: rgb(45, 66, 113);\">du lịch</a>&nbsp;tại sân bay Tân Sơn Nhất.</p><h3><br></h3><p><strong style=\"color: rgb(45, 66, 113);\">*Lưu ý:</strong></p><p><span style=\"color: rgb(45, 66, 113);\">- Hành trình có thể thay đổi thứ tự điểm đến tùy vào điều kiện thực tế.&nbsp;</span></p><p><span style=\"color: rgb(45, 66, 113);\">- Lịch trình tham quan (tắm biển, ngắm hoa, trải nghiệm,...) rất dễ bị ảnh hưởng bởi thời tiết. Đây là trường hợp bất khả kháng mong Quý khách hiểu và thông cảm.</span></p><p><span style=\"color: rgb(45, 66, 113);\">- Khách Sạn có thể ở xa trung tâm thành phố vào các mùa Cao Điểm.</span></p><p><span style=\"color: rgb(45, 66, 113);\">- Vì những yêu tố khách quan trong giai đoạn này, điểm tham quan có thể đóng cửa và được thay bằng điểm khác phù hợp với chương trình.</span></p>',
        11790000,
        8842500,
        500000,
        NULL,
        'TFP9N0ZU48-BKTRAVEL-1685610593341',
        '2023-06-05 14:45:35',
        '2023-07-04 12:30:30',
        'NOT_STARTED'
    ), (
        4,
        'Tour 4: Hà Nội - Sapa - Fansipan - Ninh Bình - Tràng An - Bái Đính - Tuyệt Tịnh Cốc - Hạ Long - Yên Tử',
        'https://media.travel.com.vn/tour/tfd_221207045206_529019.jpg',
        'https://media.travel.com.vn/tour/tfd_221207045221_161727.jpg',
        'https://media.travel.com.vn/tour/tfd_221207045229_227862.jpg',
        'https://media.travel.com.vn/tour/tfd_221207045258_917314.jpg',
        '7 ngày 6 đêm',
        'TP. Hồ Chí Minh',
        'Hà Nội, Lào Cai, Sapa, Fansipan, Bản Cát Cát, Lăng Hồ Chủ Tịch, Ninh Bình, Tràng An, Bái Đính, Hạ Long, Yên Tử',
        20,
        20,
        'Máy bay, Xe du lịch',
        '<h3>Ngày 1 - TPHCM – SB NỘI BÀI (HÀ NỘI) (Tự túc ăn ngày đầu tiên)</h3><p class=\"ql-align-justify\">Quý khách tập trung tại sân bay Tân Sơn Nhất (ga trong nước), hướng dẫn làm thủ tục cho Quý khách đáp chuyến bay đi Hà Nội. Đến sân bay Nội Bài, xe đưa quý khách về trung tâm Hà Nội nhận phòng khách sạn nghỉ ngơi.&nbsp;</p><p class=\"ql-align-right\"><strong>Nghỉ đêm tại Hà Nội.</strong></p><p class=\"ql-align-right\">&nbsp;</p><h3>Ngày 2 - HÀ NỘI – SAPA – BẢN CÁT CÁT 03 bữa ăn: (Sáng, Trưa, Chiều)</h3><p class=\"ql-align-justify\">Quý khách ăn sáng và trả phòng. Xe khởi hành đưa Quý khách đi tham quan:</p><p class=\"ql-align-justify\">-&nbsp;<strong>Lăng Hồ Chủ Tịch</strong>&nbsp;(không viếng vào thứ 2, thứ 6 hàng tuần và giai đoạn bảo trì định kì hàng năm 15/6 – 15/8) tham quan và tìm hiểu cuộc đời và sự nghiệp của vị cha già dân tộc tại&nbsp;<em>Nhà Sàn Bác Hồ, Bảo Tàng Hồ Chí Minh, Chùa Một Cột.</em></p><p class=\"ql-align-justify\">Tiếp tục hành trình, Quý khách khởi hành đi&nbsp;<a href=\"https://travel.com.vn/lao-cai/tour-sapa.aspx?utm_source=internalbl&amp;utm_medium=click&amp;utm_campaign=ATLinks\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: transparent; color: rgb(45, 66, 113);\">Sapa</a>&nbsp;theo cao tốc Hà Nội – Lào Cai. Trên đường, Quý khách dùng cơm trưa tại nhà hàng địa phương. Đến nơi, Quý khách tham quan:&nbsp;</p><p class=\"ql-align-justify\"><strong>- Bản Cát Cát</strong>&nbsp;- đẹp như một bức tranh giữa vùng phố cổ Sapa, nơi đây thu hút du khách bởi cầu treo, thác nước, guồng nước và những mảng màu hoa mê hoặc du khách khi lạc bước đến đây. Thăm những nếp nhà của người Mông, Dao, Giáy trong bản, du khách sẽ không khỏi ngỡ ngàng trước vẻ đẹp mộng mị của một trong những ngôi làng cổ đẹp nhất Sapa.</p><p class=\"ql-align-justify\">Quý khách dùng cơm tối và nhận phòng nghỉ ngơi hoặc tự do dạo phố ngắm<strong>&nbsp;nhà thờ Đá Sapa,</strong>&nbsp;tự do thưởng thức đặc sản vùng cao như:&nbsp;<strong>thịt lợn cắp nách nướng, trứng nướng, rượu táo mèo, giao lưu với người dân tộc vùng cao.</strong></p><p class=\"ql-align-right\"><strong>Nghỉ đêm tại Sapa</strong></p><h3>Ngày 3 - SAPA – FANSIPAN LEGEND – ĐÈO Ô QUY HỒ 03 bữa ăn: (Sáng, Trưa, Chiều)</h3><p class=\"ql-align-justify\">Quý khách dùng điểm tâm sáng tại khách sạn. xe đưa đoàn ra ga&nbsp;<a href=\"https://travel.com.vn/lao-cai/tour-sapa.aspx?utm_source=internalbl&amp;utm_medium=click&amp;utm_campaign=ATLinks\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: transparent; color: rgb(45, 66, 113);\">Sapa</a>, Quý khách trải nghiệm đến<strong>&nbsp;khu&nbsp;</strong><a href=\"https://travel.com.vn/?utm_source=internalbl&amp;utm_medium=click&amp;utm_campaign=ATLinks\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: transparent; color: rgb(45, 66, 113);\"><strong>du lịch</strong></a><strong>&nbsp;Fansipan Legend bằng Tàu hỏa leo núi Mường Hoa&nbsp;</strong>hiện đại nhất Việt Nam với tổng chiều dài gần 2000m, thưởng ngoạn bức tranh phong cảnh đầy màu sắc của cánh rừng nguyên sinh, thung lũng Mường Hoa.</p><p class=\"ql-align-justify\"><strong>- Chinh phục đỉnh núi Fansipan&nbsp;</strong>với độ cao 3.143m hùng vĩ bằng cáp treo (chi phí tự túc).&nbsp;</p><p class=\"ql-align-justify\">- Lễ Phật tại&nbsp;<strong>chùa Trình&nbsp;</strong>hay cầu phúc lộc, bình an cho gia đình tại Bích Vân Thiền Tự trong hệ thống cảnh quan tâm linh trên đỉnh Fansipan.&nbsp;&nbsp;&nbsp;</p><p class=\"ql-align-justify\">Tiếp tục hành trình, Quý khách dùng cơm trưa và tham quan:&nbsp;</p><p class=\"ql-align-justify\">- Chinh phục<strong>&nbsp;đèo Ô Quy Hồ&nbsp;</strong>- con đèo đẹp, hùng vĩ và dài nhất trong Tứ Đại Đỉnh Đèo miền Bắc.</p><p class=\"ql-align-justify\">- Khu du lịch&nbsp;<strong>Cổng Trời Ô Quy Hồ -</strong>&nbsp;một trong những điểm săn mây, ngắm hoàng hôn cực đẹp tại Sapa.</p><p class=\"ql-align-justify\">Quý khách dùng cơm tối tại Sapa và tự do nghỉ ngơi.</p><p class=\"ql-align-right\"><strong>Nghỉ đêm tại Sapa.</strong></p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\"><strong style=\"color: rgb(255, 0, 0);\">Lưu ý: Trong trường hợp, Fansipan không hoạt động chương trình sẽ được thay thế bằng điểm tham quan Cầu Kính Rồng Mây (không bao gồm vé tham quan).</strong></p><p class=\"ql-align-justify\">&nbsp;</p><h3>Ngày 4 - SAPA – LÀO CAI – HÀ NỘI 03 bữa ăn: (Sáng, Trưa, Chiều)</h3><p class=\"ql-align-justify\">Quý khách ăn sáng và trả phòng khách sạn. Xe khởi hành đưa Quý khách về Hà Nội, trên đường dừng tham quan mua sắm tại&nbsp;<em>Siêu thị Du lịch nông nghiệp Ocop Phú Thọ - chợ Tp Việt Trì</em>&nbsp;và dùng cơm trưa tại nhà hàng địa phương. Đến Hà Nội nhận phòng khách sạn nghỉ ngơi hoặc tự do đi tham quan&nbsp;<a href=\"https://travel.com.vn/ha-noi/tour-ho-hoan-kiem.aspx?utm_source=internalbl&amp;utm_medium=click&amp;utm_campaign=ATLinks\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: transparent; color: rgb(45, 66, 113);\"><strong>Hồ Hoàn Kiếm</strong></a><strong>&nbsp;</strong>ngắm bên ngoài&nbsp;<strong>Tháp Rùa,&nbsp;</strong><a href=\"https://travel.com.vn/ha-noi/tour-den-ngoc-son.aspx?utm_source=internalbl&amp;utm_medium=click&amp;utm_campaign=ATLinks\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: transparent; color: rgb(45, 66, 113);\"><strong>Đền Ngọc Sơn</strong></a><strong>,&nbsp;</strong><a href=\"https://travel.com.vn/ha-noi/tour-cau-the-huc.aspx?utm_source=internalbl&amp;utm_medium=click&amp;utm_campaign=ATLinks\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: transparent; color: rgb(45, 66, 113);\"><strong>Cầu Thê Húc</strong></a><strong>.</strong></p><p class=\"ql-align-right\"><strong>Nghỉ đêm tại Hà Nội.&nbsp;</strong></p><h3>Ngày 5 - HÀ NỘI - YỂN TỬ - HẠ LONG 03 Bữa ăn: (Sáng, Trưa, Chiều)</h3><p class=\"ql-align-justify\">Quý khách ăn sáng và trả phòng. Xe khởi hành đưa Quý khách đến thành phố biển&nbsp;<strong>Hạ Lon</strong>g theo quốc lộ 18, trên đường dừng ăn trưa và tham quan&nbsp;<strong>vùng đất thiêng Yên Tử:&nbsp;</strong></p><p class=\"ql-align-justify\">-&nbsp;&nbsp;&nbsp;<strong>Lưu giữ những bức ảnh đẹp tại Làng Nương&nbsp;</strong>và dùng bữa trưa tại Cơm Quê&nbsp;</p><p class=\"ql-align-justify\">-&nbsp;&nbsp;Quý khách&nbsp;<strong>lên cáp treo du ngoạn thắng cảnh thiên nhiên Đông Yên Tử</strong>&nbsp;(chi phí cáp treo tự túc), nơi còn lưu giữ nhiều di tích lịch sử mệnh danh “Đất tổ Phật giáo Việt Nam”, chiêm bái chùa Một Mái, chùa Hoa Yên – nơi tu hành của phật hoàng Trần Nhân Tông khai sinh ra dòng mới Thiền Phái Trúc Lâm, nằm trên lưng chừng núi ở độ cao 516m. Theo dấu chân Phật Hoàng viếng Chùa Đồng có tên Thiên Trúc Tự (chùa Cõi Phật), tọa lạc ở đỉnh cao nhất dãy Yên Tử (1.068m) – ngôi chùa bằng đồng lớn nhất Việt Nam.</p><p class=\"ql-align-justify\">Đến Hạ Long, Quý khách tham quan mua sắm tại&nbsp;<strong>Trung tâm Mỹ Ngọc</strong>-&nbsp;<em>Trung tâm Ngọc trai lớn nhất miền bắc Việt Nam.Tới đây Quý khách chiêm ngưỡng vẻ đẹp sang trọng, đủ các màu sắc hấp dẫn của những viên ngọc trai được nuôi trong lòng Di sản – Kỳ quan thiên nhiên thế giới vịnh Hạ Long tại phòng trưng bày sản phẩm. Quý khách có thể lựa chọn cho mình và người thân những đồ trang sức ngọc trai Hạ Long như ý và những sản phẩm lưu niệm được chế tác từ vỏ trai, sản phẩm đạt chất lượng Occop 5 sao cấp Quốc gia đầu tiên của Việt Nam.</em></p><p class=\"ql-align-justify\">Dùng cơm chiều và nhận phòng khách sạn nghỉ nghơi. Buổi tối,&nbsp;<em>Quý khách tự do khám phá nhiều hoạt động dịch vụ giải trí sôi nổi tại “phố cổ” Bãi Cháy - nằm cạnh công viên Sun World Hạ Long từ những ẩm thực đường phố đến các quán cà phê siêu dễ thương như Hòn Gai Coffee &amp; Lounge hay thoải mái bung xõa tại The Mini Bar, Brothers Pub,…</em></p><p class=\"ql-align-right\"><strong>Nghỉ đêm tại Hạ Long.&nbsp;</strong></p><p class=\"ql-align-right\">&nbsp;</p><h3>Ngày 6 - HẠ LONG – NINH BÌNH 03 Bữa ăn: (Sáng, Trưa, Chiều)</h3><p class=\"ql-align-justify\">Quý khách ăn sáng và trả phòng khách sạn. Xe đưa quý khách ra bến tàu, xuống thuyền du ngoạn<strong>&nbsp;</strong><a href=\"https://travel.com.vn/quang-ninh/tour-vinh-ha-long.aspx?utm_source=internalbl&amp;utm_medium=click&amp;utm_campaign=ATLinks\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: transparent; color: rgb(45, 66, 113);\"><strong>Vịnh Hạ Long</strong></a><strong>&nbsp;</strong>- Thắng cảnh thiên nhiên tuyệt đẹp và vô cùng sống động, được UNESCO công nhận là di sản thiên nhiên Thế giới năm 1994.</p><p class=\"ql-align-justify\">-&nbsp;<strong>Động Thiên Cung</strong>&nbsp;là một trong những động đẹp nhất ở Hạ Long. Vẻ đẹp nguy nga và lộng lẫy bởi những lớp thạch nhũ và những luồng ánh sáng lung linh.</p><p class=\"ql-align-justify\">- Từ trên tàu ngắm nhìn các hòn đảo lớn nhỏ trong Vịnh Hạ Long:&nbsp;<strong>Hòn Gà Chọi, Hòn Lư Hương.</strong></p><p class=\"ql-align-justify\">Xe đón Quý khách tại bến thuyền khởi hành đi&nbsp;<strong>Ninh Bình</strong>&nbsp;<em>- vùng đất mệnh danh là “Nơi mơ đến, chốn mong về” với nhiều di tích văn hóa, thiên nhiên vô cùng đặc sắc.</em></p><p class=\"ql-align-justify\">-&nbsp;<strong>Tuyệt Tịnh Cốc</strong>: nằm giữa mảnh đất cố đô Hoa Lư (Ninh Bình), nơi đây có động Am Tiên ẩn mình giữa lưng chừng núi và còn được mệnh danh là “thiên đường nơi hạ giới”.</p><p class=\"ql-align-justify\">Buổi tối quý khách tự do&nbsp;<strong>khám phá Phố cổ Hoa Lư</strong>, một không gian check-in cổ, đẹp, trầm mặc đẹp trở nên lung linh, huyền ảo hơn với sắc màu của những chiếc đèn lồng và Bảo Tháp trên Hồ Kỳ Lân; trải nghiệm nhiều hoạt động trò chơi dân gian và nhiều loại hình văn hóa nghệ thuật từ dân tộc như múa rối nước, nhảy múa Tắc Xình, hát xẩm, ... đến những buổi trình diễn acoustic sẽ được diễn ra vào các buổi tối ngày cuối tuần.</p><p class=\"ql-align-right\"><strong>Nghỉ đêm tại Ninh Bình.</strong></p><p class=\"ql-align-right\">&nbsp;</p><h3>Ngày 7 - NINH BÌNH - SB NỘI BÀI 02 Bữa ăn: (Sáng, Trưa)</h3><p class=\"ql-align-justify\">Quý khách ăn sáng và trả phòng khách sạn. Xe đưa quý khách tham quan:</p><p class=\"ql-align-justify\"><strong>- Khu Du Lịch&nbsp;</strong><a href=\"https://travel.com.vn/ninh-binh/tour-trang-an.aspx?utm_source=internalbl&amp;utm_medium=click&amp;utm_campaign=ATLinks\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: transparent; color: rgb(45, 66, 113);\"><strong>Tràng An</strong></a>: Quý khách lên thuyền truyền thống đi tham quan thắng cảnh hệ thống núi đá vôi hùng vĩ và các thung lũng ngập nước, thông với nhau bởi các dòng suối tạo nên các hang động ngập nước quanh năm. Điểm xuyến trong không gian hoang sơ, tĩnh lặng là hình ảnh rêu phong, cổ kính của các mái đình, đền, phủ nằm nép mình dưới chân các dãy núi cao.</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\"><strong>-&nbsp;&nbsp;</strong><a href=\"https://travel.com.vn/ninh-binh/tour-chua-bai-dinh.aspx?utm_source=internalbl&amp;utm_medium=click&amp;utm_campaign=ATLinks\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: transparent; color: rgb(45, 66, 113);\"><strong>Chùa Bái Đính</strong></a><strong>,</strong>&nbsp;một quần thể chùa với nhiều kỷ lục Việt Nam như pho tượng phật Di Lặc bằng đồng nặng 80 tấn, hành lang với 500 tượng vị La Hán, tòa Bảo Tháp cao 99m…&nbsp;</p><p class=\"ql-align-justify\">Tiếp tục hành trình, xe khởi hành đưa Quý khách ra sân bay Nội Bài làm thủ tục đón chuyến bay về Tp.HCM. Chia tay Quý khách và kết thúc chương trình&nbsp;<a href=\"https://travel.com.vn/?utm_source=internalbl&amp;utm_medium=click&amp;utm_campaign=ATLinks\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: transparent; color: rgb(45, 66, 113);\">du lịch</a>&nbsp;tại sân bay Tân Sơn Nhất.</p><h3><br></h3><p><strong style=\"color: rgb(45, 66, 113);\">*Lưu ý:</strong></p><p><span style=\"color: rgb(45, 66, 113);\">- Hành trình có thể thay đổi thứ tự điểm đến tùy vào điều kiện thực tế.&nbsp;</span></p><p><span style=\"color: rgb(45, 66, 113);\">- Lịch trình tham quan (tắm biển, ngắm hoa, trải nghiệm,...) rất dễ bị ảnh hưởng bởi thời tiết. Đây là trường hợp bất khả kháng mong Quý khách hiểu và thông cảm.</span></p><p><span style=\"color: rgb(45, 66, 113);\">- Khách Sạn có thể ở xa trung tâm thành phố vào các mùa Cao Điểm.</span></p><p><span style=\"color: rgb(45, 66, 113);\">- Vì những yêu tố khách quan trong giai đoạn này, điểm tham quan có thể đóng cửa và được thay bằng điểm khác phù hợp với chương trình.</span></p>',
        11790000,
        8842500,
        500000,
        NULL,
        'TFP9N0ZU48-BKTRAVEL-1685610593342',
        '2023-06-01 14:45:35',
        '2023-07-04 20:02:30',
        'NOT_STARTED'
    ), (
        5,
        'Đông Bắc: Hà Giang - Lũng Cú - Đồng Văn - Mã Pí Lèng - Mèo Vạc - Cao Bằng - Thác Bản Giốc - Hồ Ba Bể | Bay Bamboo Airways',
        'https://res.cloudinary.com/dtm4bscge/image/upload/v1686761030/gkzxmhsvjdkeuxudavq5.jpg',
        'https://res.cloudinary.com/dtm4bscge/image/upload/v1686761032/vew20sj17eadjtqx9po4.jpg',
        'https://res.cloudinary.com/dtm4bscge/image/upload/v1686761034/qaedryhg4xshww0xbt6x.jpg',
        'https://res.cloudinary.com/dtm4bscge/image/upload/v1686761036/xhjy3oeyfowcfiopzizt.jpg',
        '6 ngày 5 đêm',
        'TP. Hồ Chí Minh',
        'VỊ XUYÊN - HÀ GIANG - ĐỒNG VĂN - ĐÈO MÃ PÍ LÈNG - MÈO VẠC - CAO BẰNG - THÁC BẢN GIỐC - HỒ BA BỂ - HÀ NỘI',
        20,
        20,
        'Máy bay',
        '<h3>Ngày 1 - SB NỘI BÀI - HÀ GIANG 02 bữa ăn: (Trưa, Tối)</h3><p><br></p><p>Quý khách tập trung tại sân bay Tân Sơn Nhất (Ga nội địa), hướng dẫn viên hỗ trợ khách làm thủ tục đáp chuyến bay đi Hà Nội. Đến sân bay Nội Bài, xe và HDV Vietravel đón Quý khách đi Hà Giang - nơi có chè Shan Tuyết, rượu mật ong và thắng cố, xứ sở của đào phai, hoa lê, truyền thống và náo nhiệt trong buổi chợ phiên. Đến nơi, Quý khách chụp hình lưu niệm Cột mốc số 0 - đánh dấu điểm khởi công của con đường Hạnh Phúc nối Hà Giang và 4 huyện vùng cao nguyên đá</p><p><br></p><p>Xe đưa Quý khách về khách sạn nhận phòng và dùng cơm chiều, hoặc tự do thưởng thức món Chè Shan Tuyết, mật ong Bạc Hà và ấm bụng với món cháo Ấu Tẩu.</p><p>Nghỉ đêm tại Hà Giang.</p><h3><br></h3><h3>Ngày 2 - HÀ GIANG - QUẢN BẠ - YÊN MINH – ĐỒNG VĂN 03 bữa ăn: (Sáng, Trưa, Tối)</h3><p><br></p><p>Ăn sáng và trả phòng khách sạn. Xe và hướng dẫn viên khởi hành đưa Quý khách khám phá Công viên địa chất toàn cầu Cao nguyên đá Đồng Văn (Bao gồm địa giới hành chính của 4 huyện phía Bắc tỉnh Hà Giang với diện tích 2.356 km2) với những điểm check-in đặc sắc:</p><p><br></p><ul><li><strong>Ngắm Núi Đôi Quản Bạ</strong> - biểu tượng vẻ đẹp của vùng cao nguyên đá, Quý khách đi bộ lên Cổng trời Quản Bạ ngắm toàn bộ vẻ đẹp thơ mộng của thị trấn Tam Sơn và hít thở bầu không khí mát mẻ trong lành quanh năm.</li></ul><p><br></p><p>Sau khi ăn trưa, Quý khách tiếp tục hành trình đi tham quan:</p><p><br></p><ul><li><strong>Dốc Thẩm Mã</strong> – những con đường đèo khúc khuỷu, quanh co tựa như một dải lụa uốn lượn mềm mại trải dài theo triền núi.</li></ul><p><br></p><ul><li><strong>Làng văn hóa Lũng Cẩm – Thung lũng Sủng Là</strong>: được mênh danh là “ đóa hoa hồng” trong lòng cao nguyên đá luôn cuốn hút du khách bởi vẻ đẹp hết sức bình dị, mộc mạc. Nơi đây từng là bối cảnh quay bộ phim đạt giải phim truyện nhựa xuất sắc nhất của Hội điện ảnh Việt Nam - phim “Chuyện của Pao”, du khách tìm hiểu văn hóa người Mông.</li></ul><p><br></p><ul><li><strong>Khu kiến trúc nghệ thuật nhà Vương (Dinh Vua Mèo)</strong>, công trình kiến trúc đẹp, hiếm có và rất độc đáo của vùng cao nguyên núi đá.</li></ul><p><br></p><ul><li><strong>Chinh phục Cột cờ Lũng Cú </strong>hay còn gọi là đỉnh núi Rồng, nơi địa đầu Cực Bắc Tổ Quốc với lá cờ 54m2 tượng trưng cho 54 dân tộc anh em. Từ trên cao, Quý khách sẽ ngắm những mảng xanh mát của ruộng bậc thang và các bản làng Lô Lô Chải, Thèn Pả, xa xa có 2 hồ nước phía xa, nằm đối xứng nhau được người dân nơi đây ví như “mắt rồng”.</li></ul><p><br></p><ul><li>Quý khách dùng cơm chiều và nhận phòng khách sạn nghỉ ngơi.</li><li>Nghỉ đêm tại Đồng Văn hoặc Mèo Vạc</li></ul><p>&nbsp;</p><p><em>Ghi chú:</em> Điểm tham quan Cột Cờ Lũng Cú sẽ không tham quan được trong trường hợp thời tiết không thuận lợi.</p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><h3>Ngày 3 - ĐỒNG VĂN – MÈO VẠC – CAO BẰNG 03 bữa ăn: (Sáng, Trưa, Tối)</h3><p><br></p><p>Quý khách ăn sáng, trả phòng khách sạn. Xe đưa Quý khách đi tham quan:</p><p><br></p><ul><li>Đèo Mã Pì Lè</li></ul><p>ng</p><p><br></p><ul><li>: Một trong Tứ đại đỉnh đèo hùng vĩ của miền Bắc Việt Nam dài 24km, dừng chân nghỉ ngơi, chụp ảnh nơi bị chia cắt về địa hình sâu nhất của Việt Nam. Trên đường dừng chụp hình tại tượng đài Thanh Niên trước Bảo tàng Con Đường Hạnh Phúc,</li></ul><p><br></p><p>Mã Pí Lèng</p><p>café</p><p><br></p><ul><li>(chi phí tự túc), ngắm con đường hạnh phúc và toàn cảnh dòng sông Nho Quế từ trên caoQ.</li></ul><p><br></p><ul><li>Dừng chụp hình lưu niệm tại</li><li>Làng Văn</li><li>hóa Du</li><li>lịch Cộng đ</li></ul><p>ồng Pả Vi</p><p><br></p><p><br></p><p><br></p><ul><li>, nằm dưới chân đèo Mã Pì Lèng, bên cạnh dòng sông xanh nho Quế. Nơi đây thu hút sự quan tâm của du khách bởi thiết kế ấn tượng của cổng chào hình dáng chiếc khèn Mông khổng lồ, những homestay mang đậm nét văn hóa, phong cách của người Mông,…&nbsp;&nbsp;</li></ul><p><br></p><p>Tiếp tục hành trình đến Cao Bằng, Quý khách dừng tại Bảo Lạc dùng cơm trưa tại nhà hàng địa phương. Đến Cao Bằng, Quý khách nhận phòng nghỉ ngơi và dùng cơm tối.</p><p>Nghỉ đêm tại Cao Bằng.</p><p><br></p><h3>Ngày 4 - THÁC BẢN GIỐC – ĐỘNG NGƯỜM NGAO – LÀNG ĐÁ KHUỔI KY 03 bữa ăn: (Sáng, Trưa, chiều)</h3><p><br></p><p>Quý khách ăn sáng, trả phòng khách sạn. Xe khởi hành đưa Quý khách đi tham quan:</p><p><br></p><p>Thác Bản</p><p>Giốc</p><p><br></p><ul><li>- một trong những thác nước đẹp nhất của Việt Nam có đường ranh giới tự nhiên với Trung Quốc. Thác nước đẹp và hùng vỹ với dòng nước cuồn cuộn chảy quanh năm bắt nguồn từ dòng sông Quây Sơn nước xanh ngắt một màu ngọc Bích. Đẹp nhất vào mùa lúa chín (tháng 9) khung cảnh đường vào thác sáng rực một màu vàng óng và dòng nước trắng xóa mềm mại như tóc tiên càng làm khung cảnh thêm nên thơ, hùng vỹ.</li></ul><p><br></p><p>Chùa Phậ</p><p>t Tí</p><p>ch Trúc Lâ</p><p>m Bản Giốc</p><p><br></p><p><br></p><p><br></p><ul><li>: được xây dựng theo lối kiến trúc thuần Việt trên diện tích 3 ha, đây là ngôi chùa đầu tiên được xây dựng tại nơi biên cương phía Bắc của tổ quốc.</li></ul><p><br></p><ul><li>&nbsp;Quý khách dùng cơm trưa và tiếp tục tham quan:</li></ul><p><br></p><p>Động Ng</p><p>ườ</p><p>m Ngao</p><p><br></p><p><br></p><ul><li>- một động lớn được hình thành từ sự phong hoá lâu đời của đá vôi; bước vào động, du khách như bước vào một thế giới kỳ ảo, choáng ngợp trước những dải thạch nhũ muôn màu, những tượng đá quyến rũ với nhiều kiểu dáng khác nhau mang dáng dấp hình người, cây rừng, súc vật..., các nhũ đá thả từ trên xuống hay mọc từ dưới đất lên vô cùng sống động</li></ul><p><br></p><p>Làng Đ</p><p>á Khuổi</p><p>Ky</p><p><br></p><p><br></p><ul><li>: với một ý niệm đá là khởi nguồn của sự sống và trung tâm của vụ trụ mà người Tày ở Trùng Khánh luôn gìn giữ ngôi nhà sàn, nơi sinh hoạt xung quanh mình là đá, điều đó đã tạo nên điểm nhấn cho ngôi làng nhìn từ xa như một bức tranh vững chãi giữa mây trời núi non hùng vỹ. Đến đây vào homestay và thưởng thức tách café giữa khung cảnh núi rừng sẽ cho quý khách cảm giác bình yên đến lạ.</li></ul><p><br></p><p>Xe đưa Quý khách về thành phố Cao Bằng dùng cơm tối tại nhà hàng địa phương, mua sắm đặc sản địa phương: Miến dong, thạch đen, lạp xưởng, ... Quý khách nhận phòng khách sạn nghỉ ngơi.</p><p><br></p><p><br></p><h3>Ngày 5 - CAO BẰNG – KHU DI TÍCH PÁC PÓ – BA BỂ 03 bữa ăn: (Sáng, Trưa, chiều)</h3><p><br></p><p class=\"ql-align-justify\">Quý khách ăn sáng và trả phòng khách sạn. Xe khởi hành đưa Quý khách tham quan:</p><p>Khu di tích</p><p>Pác P</p><p>ó</p><p><br></p><p><br></p><ul><li class=\"ql-align-justify\">&nbsp;- nơi chủ tịch Hồ Chí Minh từng sống và làm việc với khung cảnh nên thơ, hữu tình. Dòng suối trong xanh, thơ mộng trước cửa hang được Bác đặt tên là Suối Lê Nin, ngọn núi hùng vĩ cạnh bên là Núi Các Mác</li></ul><p><br></p><p>Khu di tích</p><p>Ki</p><p>m Đồng</p><p><br></p><p><br></p><ul><li class=\"ql-align-justify\">&nbsp;- Nơi ghi nhớ anh hùng liệt sỹ có công bảo vệ cán bộ cách mạng trong thời kỳ kháng chiến.</li></ul><p>Sau khi dù</p><p>n</p><p>g cơm tr</p><p>ưa, Quý khách</p><p>khởi hành đi Bắc C</p><p>ạn, nhận phòng và n</p><p class=\"ql-align-justify\">ghỉ ngơi tạị Ba Bể.</p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><h3>Ngày 6 - BA BỂ - BẮC CẠN – SB NỘI BÀI 02 bữa ăn: (Sáng, Trưa)</h3><p>Quý khách</p><p>ra bế</p><p>n thuyền th</p><p>am quan:</p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p>Hồ Ba Bể</p><p>&nbsp;</p><p><br></p><ul><li class=\"ql-align-justify\">(2 tiếng) – Khám phá bức tranh sơn thủy hữu tình vô cùng sống động, mặt nước hồ trong xanh như gương làm quyến rũ biết bao du khách làm quyến rũ biết bao du khách, thiên nhiên và con người như hòa quyện vào nhau, ngắm Ao Tiên, Đền An Mã, hòn Bà Góa. Thuyền dừng trên mặt hồ, Quý khách giao lưu hát then và đàn tính của người Tày, hoặc tham gia chèo thuyền kayak xung quanh đảo Bà Góa (chi phí tự túc).</li></ul><p class=\"ql-align-justify\">Đoàn khởi hành về Hà Nội. Đến sân bay Nội Bài, Hướng dẫn viên hỗ trợ Quý khách làm thủ tục&nbsp;</p><p class=\"ql-align-justify\">đáp ch</p><p class=\"ql-align-justify\">uy</p><p class=\"ql-align-justify\">ến bay về</p><p class=\"ql-align-justify\">Tp.HCM. Chia t</p><p class=\"ql-align-justify\">ay Quý khách và k</p><p class=\"ql-align-justify\">ết thúc chương tr</p><p>ình&nbsp;</p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p>du lị</p><p>ch</p><p><br></p><p>&nbsp;tại</p><p>sân b</p><p>ay Tân Sơn Nh</p><p>ất.</p>',
        10000000,
        7000000,
        500000,
        NULL,
        'ZZWKFKLMEI-BKTRAVEL-1686761036707',
        '2023-06-10 14:45:35',
        '2023-07-04 20:02:30',
        'NOT_STARTED'
    ), (
        6,
        'Đà Nẵng - Sơn Trà - KDL Bà Nà - Cầu Vàng - Hội An - La Vang - Động Phong Nha & Thiên Đường - Huế (Khách sạn 4* trọn tour)',
        'https://res.cloudinary.com/dtm4bscge/image/upload/v1686761811/wyjghlefrkrbdox0czhb.jpg',
        'https://res.cloudinary.com/dtm4bscge/image/upload/v1686761814/pcj9bwhl76sr5zyfyenu.jpg',
        'https://res.cloudinary.com/dtm4bscge/image/upload/v1686761816/mz8iea1zrxjcoqrlqeam.jpg',
        'https://res.cloudinary.com/dtm4bscge/image/upload/v1686761818/zocanq0hzpytxb4qudjt.jpg',
        '5 ngày 4 đêm',
        'TP. Hồ Chí Minh',
        'Đà Nẵng, Sơn Trà, Hội An, Huế, Mỹ Khê, Ngũ Hành Sơn, Đầm Lập An, Đại Nội, Chùa Thiên Mụ, Chùa Linh Ứng, Bán Đảo Sơn Trà, Động Phong Nha, Động Thiên Đường, Thánh Địa La Vang',
        20,
        20,
        'Máy bay, Xe du lịch',
        '<h3>Ngày 1 - TP HỒ CHÍ MINH - ĐÀ NẴNG – SƠN TRÀ Số bữa ăn: 02 bữa (trưa, chiều)</h3><p>Quý khách tập trung tại Ga đi Trong Nước, sân bay Tân Sơn Nhất, hướng dẫn viên Vietravel làm thủ tục cho Quý khách đáp chuyến bay đi Đà Nẵng. Xe đón quý khách tại sân bay Đà Nẵng,&nbsp;đoàn đi tham quan:</p><p><br></p><p>- Bán đảo Sơn Trà và viếng Chùa Linh Ứng: Nơi đây có tượng Phật Quan Thế Âm cao nhất Việt Nam. Đứng nơi đây, quý khách sẽ được chiêm ngưỡng toàn cảnh thành phố, núi rừng và biển đảo Sơn Trà một cách hoàn hảo nhất.</p><p><br></p><p>- Bãi biển Mỹ Khê: Một trong những bãi biển quyến rũ nhất hành tinh, Quý khách tự do dạo biển, chụp hình.&nbsp;</p><p><br></p><p>- Mua sắm đặc sản phố biển tại Thiên Phú và Giao Mart: với hơn 2000 sản phẩm đặc sản Đà Nẵng, Miền Trung và các vùng miền lân cận, nổi bật nhất là chả bò, bò khô, mực rim me, mực khô, ghẹ sữa sốt và đầy đủ các loại khô cá,...</p><p>Buổi tối Quý khách tự túc đi dạo phố thưởng ngoạn cảnh đẹp của Đà Nẵng về đêm, ngắm nhìn Cầu Rồng, Cầu Tình Yêu, Cầu Trần Thị Lý, Trung Tâm Thương Mại, Khu phố ẩm thực, Café - Bar - Disco…. Nghỉ đêm tại Đà Nẵng.&nbsp;</p><p><br></p><p>Nghỉ đêm tại Đà Nẵng.</p><p><br></p><h3>Ngày 2 - ĐÀ NẴNG – KDL BÀ NÀ – CẦU VÀNG – HỘI AN Số bữa ăn: 02 bữa (sáng, chiều)</h3><p><br></p><p>Dùng bữa sáng tại khách sạn. Xe đưa Quý khách đi tham quan:&nbsp;</p><p><br></p><p>- Khu du lịch Bà Nà (chi phí cáp treo &amp; ăn trưa tự túc): tận hưởng không khí se lạnh của Đà Lạt tại miền Trung, đoàn tự do tham quan Chùa Linh Ứng, Hầm Rượu Debay, vườn hoa Le Jardin D’Amour, Khu Tâm linh mới của Bà Nà viếng Đền Lĩnh Chúa Linh Từ, khu vui chơi Fantasy Park, tự do chụp hình tại Cầu Vàng điểm tham quan siêu hot tại Bà Nà… Ăn trưa tại Bà Nà tự túc. Sau đó đoàn tiếp tục tham quan vui chơi đến giờ xuống cáp.</p><p><br></p><p>Buổi chiều tiếp tục hành trình đến với Hội An. Trên đường đi đoàn tham quan:&nbsp;</p><p><br></p><p>- Làng Đá Non Nước Quốc Hiệp</p><p><br></p><p>- Phố Cổ Hội An: Chùa Cầu, Nhà Cổ Phùng Hưng, Hội Quán Phước Kiến, Cơ sở Thủ Công Mỹ Nghệ,… Tự do thả đèn hoa đăng cầu sức khỏe bình an &amp; phúc lộc năm mới trên dòng sông Hoài…. (chi phí tự túc).&nbsp;</p><p><br></p><p>Đoàn quay về Đà Nẵng, nhận phòng khách sạn, tự do nghỉ ngơi.&nbsp;</p><p>&nbsp;</p><p><br></p><h3>Ngày 3 - ĐÀ NẴNG – ĐẦM LẬP AN – HUẾ Số bữa ăn: 03 bữa (sáng, trưa, chiều)</h3><p><br></p><p>Dùng bữa sáng tại khách sạn. Quý khách khởi hành đi Huế, trên đường đi dừng tham quan:</p><p><br></p><p>- Đầm Lập An: ngắm cảnh mây bồng bềnh trên những chóp núi bao bọc quanh đầm, trước khi đi xuyên Hầm Hải Vân đến Đà Nẵng.</p><p><br></p><p>- Ngọc trai VietPearl: là một trong những điểm đến thân thuộc của người dân xứ Huế chuyên tìm kiếm những nguồn ngọc trai chất lượng và đưa đến khách hàng những sản phẩm tinh tế nhất, cho Quý khách trải nghiệm đẳng cấp.</p><p><br></p><p>- Tinh dầu tràm Thái Hà: Huế được coi là xứ sở của loại dầu tràm nổi danh khắp nước với công dụng tuyệt vời, là phương thuốc lành tính, an toàn với mọi lứa tuổi, giúp tiêu tan cái mệt mỏi, các cơn đau kinh niên, cho giấc ngủ được sâu hơn,…</p><p><br></p><p>- Đại Nội: hoàng cung xưa của 13 vị Vua triều Nguyễn, tham quan Ngọ Môn, Điện Thái Hòa, Tử Cấm Thành, Thế Miếu, Hiển Lâm Các, Cửu Đình.</p><p><br></p><p>- Chùa Thiên Mụ: ngôi chùa được xem là biểu tượng xứ Huế và là nơi lưu giữ nhiều cổ vật quý giá không chỉ về mặt lịch sử mà còn cả về nghệ thuật.</p><p><br></p><p>- Mua sắm đặc sản Mè Xửng Thiên Hỷ</p><p><br></p><p>- Dạo Phố Đêm: trải nghiệm một Huế về đêm không hề trầm mặc với các công trình trải theo chiều dài lịch sử mà như một thiếu nữ trẻ trung khoác lên mình bộ cánh sắc màu căng tràn nhựa sống với tại Phố đi bộ ven sông Hương hài hòa với vẻ lung linh cầu Trường Tiền, tranh thêu XQ, tự do thưởng thức các món đường phố xứ Huế như bánh mì lọc, chè Huế, ngắm nhìn thuyền rồng ngược xuôi bên bến Tòa Khâm văng vẳng âm vang điệu hò Huế. Khám phá khu phố Tây sôi động về đêm với nhiều quán xá đông vui, những hàng quà lưu niệm.</p><p><br></p><p>Nghỉ đêm tại Huế.&nbsp;</p><p>&nbsp;</p><p><br></p><h3>Ngày 4 - HUẾ - LA VANG – ĐỘNG PHONG NHA – ĐỘNG THIÊN ĐƯỜNG Số bữa ăn: 03 bữa (sáng, trưa, chiều)</h3><p><br></p><p>Dùng bữa sáng khách sạn. Quý khách khởi hành sớm đi Quảng Bình, đoàn ghé tham quan:</p><p><br></p><p>- Thánh địa La Vang: một trong bốn tiểu vương cung thánh đường La Mã tại Việt Nam</p><p><br></p><p>- Động Phong Nha: Nằm trong quần thể Di sản thiên nhiên thế giới Phong Nha - Kẻ Bàng, được xem như chốn thần tiên bởi hệ thống núi đá vôi và sông ngầm dài nhất thế giới.</p><p><br></p><p>- Động Thiên Đường: Một trong những hang động kỳ vĩ nhất thế giới, được xem như hoàng cung dưới lòng đất, một nhánh thuộc Quần thể di sản thiên nhiên thế giới Vườn Quốc Gia Phong Nha Kẻ Bàng.&nbsp;</p><p><br></p><p>Sau khi tham quan, đoàn khởi hành về khách sạn, nhận phòng tự do nghỉ ngơi và khám phá Quảng Bình về đêm. Nghỉ đêm tại Quảng Bình.&nbsp;&nbsp;</p><p><br></p><h3>Ngày 5 - QUẢNG BÌNH - HUẾ - TPHCM Số bữa ăn: 01 bữa (sáng)</h3><p><br></p><p>Dùng bữa sáng tại khách sạn. Quý khách tự do dạo phố cảm nhận không khí trong lành và khung cảnh yên bình vào sáng sớm tại Quảng Bình.&nbsp;</p><p><br></p><p>Đoàn khởi hành trở về Huế. Xe tiễn Quý khách ra sân bay Phú Bài (Huế) đón chuyến bay trở về Tp.Hồ Chí Minh. Chia tay Quý khách và kết thúc chương trình du lịch tại sân bay Tân Sơn Nhất.&nbsp;</p>',
        8790000,
        6592500,
        280000,
        NULL,
        'DKQDCTLOTH-BKTRAVEL-1686761819072',
        '2023-06-19 14:45:35',
        '2023-07-04 20:02:30',
        'NOT_STARTED'
    ), (
        7,
        'Hà Nội - Vịnh Hạ Long - Chùa Bái Đính - Tràng An - Tuyệt Tịnh Cốc (Khách sạn 4 sao)',
        'https://res.cloudinary.com/dtm4bscge/image/upload/v1686762264/fr91ttf9bzlmukueel3b.jpg',
        'https://res.cloudinary.com/dtm4bscge/image/upload/v1686762266/gwlizfk3fmxcjnxqmung.jpg',
        'https://res.cloudinary.com/dtm4bscge/image/upload/v1686762268/qojwyn1iesspxwt7mczq.jpg',
        'https://res.cloudinary.com/dtm4bscge/image/upload/v1686762270/mgback5k2kyxl4esjdhn.jpg',
        '4 ngày 3 đêm',
        'TP. Hồ Chí Minh',
        'Hà Nội, Bái Đính, Tràng An, Hạ Long, Yên Tử, Tuyệt Tình Cốc, Quảng Ninh, Văn Miếu, Hồ Gươm',
        40,
        40,
        'Máy bay',
        '<h3>Ngày 1 - SB NỘI BÀI – HÀ NỘI 02 bữa ăn: (Trưa, Chiều)</h3><p>Quý khách tập trung tại sân bay Tân Sơn Nhất (Ga nội địa), hướng dẫn viên hỗ trợ khách làm thủ tục đáp chuyến bay đi Hà Nội. Đến sân bay Nội Bài, xe và HDV Vietravel đón Quý khách đi Hà Nội. Xe đưa Quý khách đi tham quan:</p><p><strong>Hoàng thành Thăng Long</strong>: quần thể công trình kiến trúc đồ sộ được các triều vua xây dựng trong nhiều giai đoạn lịch sử và trở thành di tích quan trọng bậc nhất trong hệ thống các di tích Việt Nam.</p><p><strong>Văn Miếu</strong>: nơi thờ Khổng Tử và các bậc hiền triết của Nho Giáo, Quốc Tử Giám - trường đại học đầu tiên của Việt Nam, tìm về cội nguồn lịch sử của các vị Nho học.</p><p>Quý khách nhận phòng khách sạn nghỉ ngơi hoặc tự do dạo 36 phố phường Hà Nội, trải nghiệm không gian sôi nổi, náo nhiệt tại Phố Tạ Hiện hay tìm một gốc với ly cà phê quan sát phố cổ hẳn cũng rất thú vị.</p><p>Nghỉ đêm tại Hà Nội.&nbsp;&nbsp;</p><h3>Ngày 2 - HÀ NỘI – HẠ LONG 03 bữa ăn: (Sáng, Trưa, Chiều)</h3><p>Quý khách ăn sáng và trả phòng khách sạn.&nbsp;Xe khởi hành đưa Quý khách đi tham quan <strong>Hồ Hoàn Kiếm</strong> ngắm bên ngoài Tháp Rùa, Đền Ngọc Sơn, Cầu Thê Húc.</p><p>Tiếp tục hành trình, xe khởi hành đưa Quý khách đến thành phố biển Hạ Long qua đường cao tốc Hải Phòng – Hạ Long, trên đường ngắm cảnh Bạch Đằng Giang. Đến nơi, Quý khách xuống thuyền đi du ngoạn<strong> Vịnh Hạ Long</strong> - Thắng cảnh thiên nhiên tuyệt đẹp và vô cùng sống động, được UNESCO công nhận là di sản thiên nhiên Thế giới năm 1994.</p><p>Động Thiên Cung là một trong những động đẹp nhất ở Hạ Long. Vẻ đẹp nguy nga và lộng lẫy bởi những lớp thạch nhũ và những luồng ánh sáng lung linh.</p><p>Từ trên tàu ngắm nhìn các hòn đảo lớn nhỏ trong Vịnh Hạ Long: Hòn Gà Chọi, Hòn Lư Hương.</p><p>Tham quan mua sắm đặc sản tại <strong>Trung Tâm OCOP Central Hạ Long</strong> với nhiều mặt hàng hải sản tươi, khô, chả mực, … đạt chất lượng theo tiêu chuẩn OCOP.</p><p>Quý khách nhận phòng khách sạn nghỉ ngơi hay tự do khám phá nhiều hoạt động dịch vụ giải trí sôi nổi tại “phố cổ” Bãi Cháy - nằm cạnh công viên Sun World Hạ Long từ những ẩm thực đường phố đến các quán cà phê siêu dễ thương như Hòn Gai Coffee &amp; Lounge hay thoải mái bung xõa tại The Mini Bar, Brothers Pub,..</p><p>&nbsp;</p><p>Hoặc lựa chọn một số dịch vụ khám phá Hạ Long về đêm (tự túc phương tiện và chi phí tham quan):</p><p>Trải nghiệm dịch vụ<strong> Cáp Treo Nữ Hoàng</strong> tại Sun World Hạ Long Complex trên Núi Ba Đèo, chiêm ngưỡng cảnh đẹp về đêm của thành phố Hạ Long dưới ánh đèn lung linh (thời gian hoạt động cáp treo dự kiến từ 10h đến 18h các ngày thứ 7 và CN)</p><p>Nghỉ đêm tại Hạ Long.</p><h3>Ngày 3 - HẠ LONG – NINH BÌNH 03 bữa ăn: (Sáng, Trưa, Chiều)</h3><p>Quý khách ăn sáng tại khách sạn. Xe đưa Quý khách đi tham quan Bảo Tàng Quảng Ninh và chụp hình bên ngoài Cung Cá Heo - Cung Quy Hoạch, Hội Chợ, Triển Lãm Và Văn Hóa Quảng Ninh, dường như đã trở thành điểm đến ấn tượng trong du khách với lối kiến trúc độc đáo.</p><p>Quý khách về khách sạn trả phòng và dùng cơm trưa. Tiếp tục hành trình, Quý khách khởi hành đi Ninh Bình - vùng đất mệnh danh là “Nơi mơ đến, chốn mong về” với nhiều di tích văn hóa, thiên nhiên vô cùng đặc sắc. Đến nơi, quý khách chiêm bái Chùa Bái Đính - một quần thể chùa với nhiều kỷ lục Việt Nam như pho tượng phật Di Lặc bằng đồng nặng 80 tấn, hành lang với 500 tượng vị La Hán, tòa Bảo Tháp cao 99m…</p><p>Quý khách tự do khám phá <strong>Phố cổ Hoa Lư</strong>, một không gian check-in cổ, đẹp, trầm mặc đẹp trở nên lung linh, huyền ảo hơn với sắc màu của những chiếc đèn lồng và <strong>Bảo Tháp trên Hồ Kỳ Lân</strong>; trải nghiệm nhiều hoạt động trò chơi dân gian và nhiều loại hình văn hóa nghệ thuật từ dân tộc như múa rối nước, nhảy múa Tắc Xình, hát xẩm,.. đến những buổi trình diễn acoustic sẽ được diễn ra vào các buổi tối ngày cuối tuần.</p><p>Nghỉ đêm tại Ninh Bình.</p><h3>Ngày 4 - NINH BÌNH – SB NỘI BÀI 02 Bữa ăn: (Sáng, Trưa)</h3><p>Quý khách ăn sáng và trả phòng khách sạn. Xe đưa Quý khách đi tham quan:</p><p><strong>Khu Du Lịch Tràng An</strong>: Quý khách lên thuyền truyền thống đi tham quan thắng cảnh hệ thống núi đá vôi hùng vĩ và các thung lũng ngập nước, thông với nhau bởi các dòng suối tạo nên các hang động ngập nước quanh năm. Điểm xuyến trong không gian hoang sơ, tĩnh lặng là hình ảnh rêu phong, cổ kính của các mái đình, đền, phủ nằm nép mình dưới chân các dãy núi cao.</p><p><strong>Tuyệt Tịnh Cốc</strong>: nằm giữa mảnh đất cố đô Hoa Lư (Ninh Bình), động Am Tiên ẩn mình giữa lưng chừng núi được mệnh danh là “thiên đường nơi hạ giới” và được giới trẻ gọi là Tuyệt Tịnh Cốc Việt Nam.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p><p>Xe khởi hành đưa Quý khách ra sân bay Nội Bài làm thủ tục đón chuyến bay về Tp.HCM. Chia tay Quý khách và kết thúc chương trình du lịch tại sân bay Tân Sơn Nhất.</p>',
        8990000,
        4000000,
        500000,
        NULL,
        'P8OE1G0LA2-BKTRAVEL-1686762270314',
        '2023-06-22 14:45:35',
        '2023-07-04 20:02:30',
        'NOT_STARTED'
    ), (
        8,
        'Miền Bắc: Hà Nội - Yên Tử - Hạ Long - Ninh Bình',
        'https://res.cloudinary.com/dtm4bscge/image/upload/v1686762537/sg9cfzwz80ouptgl137e.jpg',
        'https://res.cloudinary.com/dtm4bscge/image/upload/v1686762539/yzwgitn8glihp6l3rbke.jpg',
        'https://res.cloudinary.com/dtm4bscge/image/upload/v1686762541/mbdca9pkwdq7j1onqvxf.jpg',
        'https://res.cloudinary.com/dtm4bscge/image/upload/v1686762545/huoqep9flbogawybxeun.jpg',
        '4 ngày 3 đêm',
        'Đà Lạt',
        'Hà Nội - Yên Tử - Hạ Long - Ninh Bình - Tràng An - Bái Đính',
        30,
        30,
        'Máy bay, Xe du lịch',
        '<h3>Ngày 1 - Đà Lạt – Hà Nội (Ăn Trưa, Tối)</h3><p class=\"ql-align-justify\">Qúy khách tập trung tại&nbsp;<a href=\"https://www.vietravel.com/?utm_source=internalbl&amp;utm_medium=click&amp;utm_campaign=ATLinks\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(45, 66, 113); background-color: transparent;\"><strong>Vietravel</strong></a><strong>&nbsp;Đà Lạt (28 Pasteur, phường 4)</strong>. Xe và hướng dẫn viên đón quý khách làm thủ tục đáp chuyến bay đi<strong>&nbsp;Hà Nội.</strong></p><p class=\"ql-align-justify\">Giờ bay dự kiến<strong>: VU-240 | 09:00 – 10:55.&nbsp;&nbsp;&nbsp;</strong></p><p class=\"ql-align-justify\">Đến sân bay Nội Bài,&nbsp;xe và HDV Vietravel đón quý khách đi ăn trưa. Sau đó tham quan:</p><p class=\"ql-align-justify\"><strong>•&nbsp;&nbsp;&nbsp;Văn Miếu:</strong>&nbsp;nơi thờ Khổng Tử và các bậc hiền triết của Nho Giáo, Quốc Tử Giám - trường đại học đầu tiên của Việt Nam, tìm về cội nguồn lịch sử của các vị Nho học.</p><p class=\"ql-align-justify\"><strong>•&nbsp;&nbsp;&nbsp;Hoàng thành Thăng Long</strong>: quần thể công trình kiến trúc đồ sộ được các triều vua xây dựng trong nhiều giai đoạn lịch sử và trở thành di tích quan trọng bậc nhất trong hệ thống các di tích Việt Nam.</p><p class=\"ql-align-justify\">Quý khách nhận phòng khách sạn nghỉ ngơi hoặc tự do đi tham quan phố cổ Hà Nội.</p><p class=\"ql-align-right\"><strong>Nghỉ đêm tại Hà Nội</strong></p><h3>Ngày 2 - Hà Nội - Yên Tử - Hạ Long ( Ăn Sáng, Trưa, Tối )</h3><p class=\"ql-align-justify\"><strong>Quý khách khởi hành đi Hạ Long</strong>&nbsp;xe khởi hành đưa Quý khách đến thành phố biển Hạ Long theo quốc lộ 18, trên đường dừng ăn trưa và tham quan vùng đất thiêng&nbsp;<a href=\"https://travel.com.vn/quang-ninh/tour-yen-tu.aspx?utm_source=internalbl&amp;utm_medium=click&amp;utm_campaign=ATLinks\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(45, 66, 113); background-color: transparent;\"><strong>Yên Tử</strong></a><strong>:&nbsp;</strong></p><p class=\"ql-align-justify\">•&nbsp;&nbsp;&nbsp;Tham quan chụp hình Làng Nương và dùng bữa trưa tại Cơm Quê.&nbsp;</p><p class=\"ql-align-justify\"><strong>•&nbsp;&nbsp;&nbsp;Quý khách lên cáp treo du ngoạn thắng cảnh thiên nhiên Đông Yên Tử</strong>&nbsp;(Chi phí tự túc), nơi còn lưu giữ nhiều di tích lịch sử mệnh danh “Đất tổ Phật giáo Việt Nam”, chiêm bái chùa Một Mái, chùa Hoa Yên – nơi tu hành của phật hoàng Trần Nhân Tông khai sinh ra dòng mới Thiền Phái Trúc Lâm, nằm trên lưng chừng núi ở độ cao 516m. Theo dấu chân Phật Hoàng viếng Chùa Đồng có tên Thiên Trúc Tự (chùa Cõi Phật), tọa lạc ở đỉnh cao nhất dãy Yên Tử (1.068m) – ngôi chùa bằng đồng lớn nhất Việt Nam.</p><p class=\"ql-align-justify\"><strong>Quý khách nhận phòng khách sạn và dùng cơm chiều</strong>. Buổi tối, Quý khách tự do khám phá nhiều hoạt động dịch vụ giải trí sôi nổi tại “phố cổ” Bãi Cháy - nằm cạnh công viên Sun World Hạ Long từ những ẩm thực đường phố đến các quán cà phê siêu dễ thương như Hòn Gai Coffee &amp; Lounge hay thoải mái bung xõa tại The Mini Bar, Brothers Pub,…</p><p class=\"ql-align-right\"><strong>Nghỉ đêm tại Hạ Long.</strong></p><h3>Ngày 3 - Hạ Long - Ninh Bình (Ăn Sáng, Trưa, Tối)</h3><p class=\"ql-align-justify\">Ăn sáng và trả phòng khách sạn. Xe và HDV khởi hành đưa Quý khách đi tham quan:&nbsp;</p><ul><li class=\"ql-align-justify\">Lên thuyền đi du ngoạn&nbsp;<strong>Vịnh Hạ Long</strong>&nbsp;- Thắng cảnh thiên nhiên tuyệt đẹp và vô cùng sống động, được UNESCO công nhận là di sản thiên nhiên Thế giới năm 1994.</li><li class=\"ql-align-justify\">Tham quan&nbsp;<strong>Động Thiên Cung</strong>&nbsp;là một trong những động đẹp nhất ở Hạ Long. Vẻ đẹp nguy nga và lộng lẫy bởi những lớp thạch nhũ và những luồng ánh sáng lung linh. Từ trên tàu ngắm nhìn các hòn đảo lớn nhỏ trong Vịnh Hạ Long: Hòn Gà Chọi, Hòn Lư Hương.</li></ul><p class=\"ql-align-justify\">Xe đón Quý khách tại cảng&nbsp;<strong>khởi hành đi Ninh Bình -&nbsp;</strong>vùng đất mệnh danh là “Nơi mơ đến, chốn mong về” với nhiều di tích văn hóa, thiên nhiên vô cùng đặc sắc. Đến nơi, Quý khách&nbsp;<strong>Viếng&nbsp;</strong><a href=\"https://travel.com.vn/ninh-binh/tour-chua-bai-dinh.aspx?utm_source=internalbl&amp;utm_medium=click&amp;utm_campaign=ATLinks\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(45, 66, 113); background-color: transparent;\"><strong>Chùa Bái Đính</strong></a><strong>&nbsp;</strong>- một quần thể chùa với nhiều kỷ lục Việt Nam như pho tượng phật Di Lặc bằng đồng nặng 80 tấn, hành lang với 500 tượng vị La Hán, tòa Bảo Tháp cao 99m…</p><p class=\"ql-align-justify\">Buổi tối quý khách tự do khám phá&nbsp;<strong>Phố cổ Hoa Lư</strong>, một không gian check-in cổ, đẹp, trầm mặc đẹp trở nên lung linh, huyền ảo hơn với sắc màu của những chiếc đèn lồng và Bảo Tháp trên Hồ Kỳ Lân; trải nghiệm nhiều hoạt động trò chơi dân gian và nhiều loại hình văn hóa nghệ thuật từ dân tộc như múa rối nước, nhảy múa Tắc Xình, hát xẩm, ... đến những buổi trình diễn acoustic sẽ được diễn ra vào các buổi tối ngày cuối tuần.</p><p class=\"ql-align-right\"><strong>Nghỉ đêm tại Ninh Bình.</strong></p><h3>Ngày 4 - Ninh Bình - Hà Nội - Đà Lạt (Ăn Sáng, Trưa)</h3><p class=\"ql-align-justify\">Quý khách ăn sáng và trả phòng khách sạn<strong>.&nbsp;</strong>Xe đưa Quý khách đi tham quan:&nbsp;</p><p class=\"ql-align-justify\"><strong>•&nbsp;&nbsp;&nbsp;Khu Du Lịch&nbsp;</strong><a href=\"https://travel.com.vn/ninh-binh/tour-trang-an.aspx?utm_source=internalbl&amp;utm_medium=click&amp;utm_campaign=ATLinks\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(45, 66, 113); background-color: transparent;\"><strong>Tràng An</strong></a>: Quý khách lên thuyền truyền thống đi tham quan thắng cảnh hệ thống núi đá vôi hùng vĩ và các thung lũng ngập nước, thông với nhau bởi các dòng suối tạo nên các hang động ngập nước quanh năm. Điểm xuyến trong không gian hoang sơ, tĩnh lặng là hình ảnh rêu phong, cổ kính của các mái đình, đền, phủ nằm nép mình dưới chân các dãy núi cao.&nbsp;</p><p class=\"ql-align-justify\">Xe khởi hành đưa Quý khách khởi hành đi đến sân bay Nội Bài làm thủ tục đón chuyến bay về Đà Lạt.&nbsp;</p><p class=\"ql-align-justify\">Giờ bay dự kiến&nbsp;<strong>VJ409 | 17:15 – 19:10.</strong></p><p class=\"ql-align-justify\">Đến sân bay&nbsp;<strong>Liên Khương xe và HDV</strong>&nbsp;đón quý khách về điểm hẹn ban đầu<strong>&nbsp;28 Pasteur Phường 4</strong>. Chia tay và tạm biệt Quý khách .</p><p class=\"ql-align-justify\">Lưu ý:&nbsp;<em>Thứ tự các điểm tham quan, chi tiết trong chương trình có thể thay đổi để phù hợp với tình hình&nbsp;</em></p><p class=\"ql-align-justify\"><em>thực tế của chuyến đi.</em></p>',
        9990000,
        4990000,
        0,
        NULL,
        'THXWVPGFXL-BKTRAVEL-1686762545023',
        '2023-06-20 14:45:35',
        '2023-07-04 20:02:30',
        'NOT_STARTED'
    ), (
        9,
        'Phú Quốc - Đảo Ngọc thiên đường - Bãi Sao - Thử Tài Câu Cá - Bay Vietjet air - Khách sạn 4 sao',
        'https://res.cloudinary.com/dtm4bscge/image/upload/v1686763043/fsk8avnkg823fcemcrjt.jpg',
        'https://res.cloudinary.com/dtm4bscge/image/upload/v1686763045/fm0hanynzwczmmrkqykk.jpg',
        'https://res.cloudinary.com/dtm4bscge/image/upload/v1686763047/hrl84owdnvpww2buqt8e.jpg',
        'https://res.cloudinary.com/dtm4bscge/image/upload/v1686763049/m9owq0vah3suisbphhum.jpg',
        '4 ngày 3 đêm',
        'Hà Nội',
        'Phú Quốc, Đảo Ngọc thiên đường, Bãi Sao',
        15,
        15,
        'Máy bay, Xe du lịch',
        '<h3>Ngày 1 - HÀ NỘI - PHÚ QUỐC (Ăn tối) - Trường hợp chuyến bay trước 11h trưa, Vietravel sẽ hỗ trợ bữa ăn trưa</h3><p>Quý khách tập trung tại Vietravel (Số 3 Hai Bà Trưng, Hoàn Kiếm, Hà Nội). Xe và Hướng dẫn viên đưa đoàn ra sân bay Nội Bài đáp chuyến bay đi Phú Quốc.</p><p>Đến Phú Quốc, Hướng dẫn viên đưa đoàn tham quan;</p><p>-<strong> Dinh Cậu</strong>: biểu tượng văn hoá và tín ngưỡng của đảo Phú Quốc. Nơi ngư dân địa phương gởi gắm niềm tin cho một chuyến ra khơi đánh bắt đầy ắp cá khi trở về. Sau đó, đoàn viếng dinh Bà Thủy Long Thánh Mẫu - thờ Thần Nữ Kim Giao, người phụ nữ được người dân Phú Quốc rất mực tôn kính vì có công khai phá huyện đảo này.</p><p>- <strong>Chùa Sư Muôn (Hùng Long Tự)</strong>: ngôi chùa có kiến trúc dân gian, nằm trên triền núi, mặt hướng ra biển, xung quanh cây cối xanh tốt. Đến đây du khách cảm nhận vẻ đẹp thanh tịnh, bình yên và cầu nguyện sự an lành và hạnh phúc đến với gia đình.</p><p>- <strong>Trại rắn Đồng Tâm 2</strong>: trung tâm nghiên cứu và bảo tồn các loài rắn quý duy nhất trên đảo. Tại đây, Quý khách được nghe giới thiệu về các loài rắn: rắn hổ chúa, rắn cạp nong, rắn lục đuôi đỏ,…; xem biểu diễn lấy nọc rắn và trải nghiệm chụp hình với những chú trăn đã được thuần hóa</p><p>- <strong>Suối Tranh</strong>: dòng suối mát lạnh từ trong khe núi len lỏi chảy qua rừng cây, khe đá để cùng hoà vào dòng chính tạo nên dòng suối Tranh hiền hoà.</p><p>&nbsp;</p><p>Buổi chiều, đoàn tham quan làng chài Hàm Ninh: làng chài cổ xưa của người dân trên đảo, vào những ngày thời tiết đẹp du khách có thể ngắm ánh hoàng hôn ráng chiều buông xuống và check-in tại khu vực cầu gỗ lung linh ánh đèn.</p><p>Trở về khách sạn, đoàn tự do khám phá “Đảo Ngọc” về đêm.</p><p>Nghỉ đêm tại Phú Quốc.</p><h3>Ngày 2 - TRẢI NGHIỆM CÂU CÁ TRÊN BIỂN - THIỀN VIỆN TRÚC LÂM HỘ QUỐC - THỊ TRẤN HOÀNG HÔN (Ăn sáng, trưa, tối)</h3><p>Sau khi ăn sáng tại khách sạn, Quý khách lên thuyền du ngoạn và cùng nhau thử tài câu cá, thật là thú vị khi tự tay Quý khách câu được những chú cá Mú hay Tràm... và đây cũng là dịp được trải nghiệm cuộc sống cần mẫn của người dân nơi hải đảo.</p><p>- <strong>Nam đảo</strong> (giai đoạn tháng 5 - 9): đoàn sẽ được câu cá và tắm biển tại Bãi Sao - một bãi biển dịu êm với bãi cát dài tĩnh lặng và nguyên sơ, được độc giả CN Traveler bình chọn vào danh sách 10 bãi biển hoang sơ nhất thế giới… Ngoài tắm biển, du khách có thể tham gia những trò chơi cảm giác mạnh trên biển như: Jetsky, ca nô dù kéo, môtô nước… (chi phí tự túc)</p><p>+ <strong>Bắc đảo</strong> (giai đoạn tháng 10 - 4): du khách câu cá và tắm biển tại Bãi Ông Lang.</p><p>Lưu ý: Đoàn câu cá và lặn ngắm san hô còn phụ thuộc vào điều kiện thực tế tại thời điểm đoàn tham quan</p><p>&nbsp;</p><p>+ Buổi chiều đoàn tham quan Thiền Vi<strong>ện Trúc Lâm Hộ Quốc </strong>: ngôi chùa đẹp và lớn nhất đảo ngọc với khung cảnh hoang sơ, yên tĩnh đã tạo nên một bức tranh thiên nhiên đặc sắc đầy vẻ tôn nghiêm và thanh tịnh.</p><p>+ <strong>Quần Thể Đảo Yến Phú Quốc </strong>: hòa vào không gian xanh, du khách nghe giới thiệu quy trình sơ chế sản phẩm và mua sắm đặc sản yến sào bổ dưỡng.</p><p>+ <strong>Nhà tù Phú Quốc </strong>: nơi đây là minh chứng hùng hồn cho công cuộc đấu tranh đầy gian khổ và tinh thần bất khuất của nhân dân ta trong các cuộc đấu tranh chống giặc ngoại xâm.</p><p>&nbsp;</p><p>+ Tìm bình yên trong hành trình ‘Đi Theo Ánh Mặt Trời’ tại <strong>Thị trấn Hoàng Hôn</strong> - được thiết kế với kiến trúc độc đáo, rực rỡ sắc màu của một thị trấn châu Âu cổ kính: Lãng du trên con đường thị trấn</p><p>, check-in ‘1001’ kiểu bậc thang, ngắm nhìn Quảng trường La Mã lấp lánh dưới ánh mai.</p><p><br></p><p>+ Say đắp giữa nghệ thuật tại <strong>Tháp đồng hồ </strong>cao 75m: lấy ý tưởng từ tháp chuông St. Mark’s Campanile củaÝ.</p><p>Lắng đọng với “kỳ quan” <strong>Khải Hoàn Môn</strong> nhuốm ánh chiều tà.</p><p><br></p><p>+ Chiêm ngưỡng <strong>Kiss Bridge</strong>: cây cầu nổi lên như một dải lụa giữa bờ biển trong xanh, với hai nhịp cầu vươn mình ôm trọn bờ cát trắng, hướng đến nhau, hợp vào làm một thể thống nhất nhưng không chạm nhau. Ngắm nhìn bức tranh hoàng hôn tuyệt diệu đang dần buông xuống đường chân trời nơi đại dương xanh thẳm, đầy lãng mạn.</p><p>Sau khi ăn tối tại nhà hàng, Quý khách tự do tham quan chợ đêm Phú Quốc</p><p>Nghỉ đêm tại Phú Quốc.</p><h3>Ngày 3 - KHÁM PHÁ VINWONDERS - VINPEARL SAFARI - GRAND WORLD (Ăn sáng, tối)</h3><p>Quý khách dùng bữa sáng tại khách sạn.&nbsp;</p><p>Gợi ý Quý khách (1) trong (4) lựa chọn sau (Quý khách sẽ tự túc phương tiện di chuyển đến điểm tham quan)</p><p><br></p><p><strong><em>* Lựa chọn 1:</em></strong></p><p>- Trải nghiệm hành trình trở về với thiên nhiên tại <strong>Vinpearl Safari </strong>- thiên đường bán hoang dã duy nhất tại Phú Quốc với quy mô 180 ha, hơn 130 loài động vật quý hiếm, du khách thưởng thức các chương trình biểu diễn, chụp ảnh với động vật; trải nghiệm vườn thú mở trong rừng tự nhiên, gần gũi và thân thiện với con người.</p><p>- Hay tham quan khu vui chơi giải trí <strong>VinWonders </strong>- công viên chủ đề lớn nhất Việt Nam, quy mô hàng đầu Châu Á, Quý khách khám phá 12 nền văn minh nhân loại từ cổ chí kim;</p><p>Cuồng nhiệt tại một trong những công viên nước lớn nhất Đông Nam Á;</p><p>Chinh phục du khách với bộ 3 trò chơi mới mẻ đầy hấp dẫn: Ngôi làng Chiến binh, Núi lửa Kinh hoàng và Lời nguyền Ác long hay Cung điện Hải vương kỳ bí và đầy sức sống…</p><p>Choáng ngợp trước thế giới đại dương huyền ảo với tầm nhìn vô cực qua tấm kính acrylic khổng lồ 8x25m bên trong Cung điện Hải vương - thủy cung hình rùa lớn nhất thế giới</p><p><br></p><p><strong><em>* Lựa chọn 2:</em></strong></p><p>Trải nghiệm bộ môn đi bộ dưới đáy biển khám phá công viên san hô: dạo bước trên thảm cát trắng mịn, hai bên lối đi là những rạn san hô theo dòng hải lưu đong đưa thú vị và mở ra một khung cảnh tuyệt vời trước mắt với vẻ đẹp muôn màu của hơn 200 loài san hô cùng hàng chục loài sinh vật biển đặc sắc (du khách không cần biết bơi cũng có thể tham gia)</p><p><br></p><p><strong><em>* Lựa chọn 3:</em></strong></p><p>Đến Versailles Mud Bath and Spa - thiên đường bùn khoáng đầu tiên tại Phú QuốcTrải: nghiệm liệu trình tắm bùn tinh khiết, vừa ngắm phong cảnh biển, vừa nghe giai điệu du dương của những con sóng rì rào, giúp du khách có làn da mềm mịn và tái tạo năng lượng một cách hiệu quả.</p><p><strong><em>* Lựa chọn 4:</em></strong></p><p>Quý khách tự do nghỉ ngơi tại khách sạn hoặc tắm biển, khám phá Phú Quốc.</p><p>Quý khách tự túc dùng bữa trưa</p><p>&nbsp;</p><p>Buổi chiều, xe đưa Quý khách đến khám phá những hạng mục nổi bật tại “thành phố không ngủ” Grand World như:</p><p>- <strong>Công viên Nghệ Thuật Đương Đại</strong>: sự giao thoa đặc sắc giữa nghệ thuật đương đại và thiên nhiên Đảo Ngọc.</p><p>- <strong>Huyền thoại Tre</strong>: công trình tre lớn nhất Việt Nam.</p><p>-<strong> Tản bộ bên dòng “kênh đào Venice”</strong> và nhìn ngắm những chiếc thuyền Gondola, khu phố shophouse lộng lẫy sắc màu, cổng lâu đài tráng lệ, ba cây cầu vòm bán nguyệt mang đậm kiến trúc châu Âu ...</p><p>-<strong> Hồ Tình Yêu “Sắc màu Venice”</strong> đưa du khách phiêu với câu chuyện tình yêu lãng mạn được kể lại một cách hoàn hảo trên mặt nước, sử dụng công nghệ 3D Mapping hiện đại bậc nhất thế giới.</p><p>Nghỉ đêm tại Phú Quốc.</p><h3>Ngày 4 - PHÚ QUỐC - HÀ NỘI (Ăn sáng)</h3><p>(Trường hợp chuyến bay khởi hành sau 13h - Vietravel sắp xếp bữa ăn trưa cho quý khách)</p><p>Quý khách ăn sáng, trả phòng, xe đưa Quý khách tham quan và mua sắm đặc sản nổi tiếng tại nhà thùng nước mắm Hồng Đức 1, đặc sản Đức Thạnh, cơ sở sản xuất ngọc trai Phú Quốc - trưng&nbsp;bày các trang sức bằng ngọc trai chính hiệu được nuôi cấy tại Phú Quốc.</p><p>Xe đưa đoàn ra sân bay Phú Quốc, Đoàn về đến sân bay Nội Bài, Hướng dẫn viên đón đoàn về lại điểm hẹn ban đầu.</p>',
        7590000,
        4500000,
        500000,
        NULL,
        'XSRKUO2MIQ-BKTRAVEL-1686763048985',
        '2023-06-21 14:45:35',
        '2023-07-04 20:02:30',
        'NOT_STARTED'
    ), (
        10,
        'Long Xuyên- Côn Đảo - Thiên Đường Nghỉ Dưỡng Nơi Biển Xanh Cát Trắng',
        'https://res.cloudinary.com/dtm4bscge/image/upload/v1686763721/d2uqqezeikq8lavno8yw.jpg',
        'https://res.cloudinary.com/dtm4bscge/image/upload/v1686763723/urpeziynpgm08cm4s5wl.jpg',
        'https://res.cloudinary.com/dtm4bscge/image/upload/v1686763725/kx9kfm73ivmtgawoybhh.jpg',
        'https://res.cloudinary.com/dtm4bscge/image/upload/v1686763728/vmu2fxjlq31igry9p8xa.jpg',
        '3 ngày 2 đêm',
        'Long Xuyên',
        'Trại tù Phú Hải, Chuồng cọp Pháp - Mỹ, Nghĩa trang Hàng Dương, Miếu Bà Phi Yến, Chùa Vân Sơn, Biển Đầm Trầu, Miếu Cậu, Cảng Bến Đầm',
        15,
        15,
        'Xe du lịch',
        '<h3>Ngày 1 - LONG XUYÊN – CẦN THƠ – TÀU CAO TỐC MAI LINH – CÔN ĐẢO (Ăn ba bữa)</h3><p>Quý khách tập trung tại <strong><em>Vietravel chi nhánh Long Xuyên</em></strong> (Số 99 – 101 Nguyễn Huệ, Mỹ Long, Long Xuyên), đến bến tàu cao tốc Mai Linh tại Cần Thơ hướng dẫn viên làm thủ tục cho Quý khách lên tàu đi Côn Đảo.&nbsp;&nbsp;</p><ul><li>Xe Côn Đảo đón Quý khách tại bến tàu, tham quan <strong>Trại tù Phú Hải</strong>,<strong> Chuồng cọp Pháp - Mỹ</strong>, viếng <strong>Nghĩa trang Hàng Dương</strong> - Thắp hương tại đài tưởng niệm chung cho gần 2000 ngôi mộ của các chiến sỹ yêu nước, <strong>Miếu Bà Phi Yến</strong> - Thứ phi vua Nguyễn Ánh, sau đó ghé thăm <strong>Chùa Vân Sơn</strong> - Ngôi chùa đầu tiên và duy nhất trên Côn Đảo. Trở về khách sạn tự do tắm biển nghỉ ngơi.&nbsp;</li></ul><p>Nghỉ đêm tại Côn Đảo.&nbsp;</p><p>&nbsp;</p><h3>Ngày 2 - KHÁM PHÁ CÔN ĐẢO - “THIÊN ĐƯỜNG CỦA BIỂN” (Ăn ba bữa)</h3><ul><li>Sau khi ăn sáng, xe đưa Quý khách tham quan Biển Đầm Trầu - Một trong những bãi biển hoang sơ và đẹp nhất tại Côn Đảo với cát mịn, biển trong xanh. Từ đường chính, Quý khách đi bộ theo đường mòn vào bãi tắm khoảng 1,5 km. Trên đường đi, Quý khách dừng chân thắp nhang viếng<strong> Miếu Cậu</strong> - Nơi thờ Hoàng tử Cải con vua Nguyễn Ánh và thứ phi Phi Yến. Đến bãi tắm, Quý khách tự do nghỉ ngơi, thư giãn, tắm biển.&nbsp;</li><li>Buổi chiều, Quý khách tham quan<strong> Cảng Bến Đầm</strong> là cảng lớn nhất tại Côn Đảo. Trên đường đi, Quý khách sẽ được giới thiệu về các địa danh:<strong> Mũi Cá Mập </strong>- Có hình tượng giống Hàm Cá Mập, Đỉnh Tình Yêu - Là chóp núi có hình tượng của đôi trai gái đang tâm tình mà thiên nhiên đã ban tặng cho Côn Đảo. Tiếp tục, Quý khách tham quan Bãi Nhát - Một bãi tắm bị tác động của thủy triều, khi nước xuống sẽ lộ thiên một bãi tắm với cát trắng mịn. Buổi tối, Quý khách tự do nghỉ ngơi, tản bộ ngắm Cầu tàu 914 và khám phá Côn Đảo về đêm.&nbsp;</li></ul><p>Nghỉ đêm tại Côn Đảo.&nbsp;</p><p>&nbsp;</p><h3>Ngày 3 - CÔN ĐẢO – TÀU MAI LINH (CẦN THƠ) - LONG XUYÊN (Ăn sáng, trưa)</h3><ul><li>Ăn sáng tại khách sạn, Quý khách tự do nghỉ ngơi thư giãn hoặc mua sắm đặc sản về làm quà tặng cho người thân và bạn bè tại chợ Côn Đảo. Xe đưa Quý khách ra bến tàu, hướng dẫn viên làm thủ tục cho Quý khách<strong> lên tàu cao tốc Mai Linh trở về Cần Thơ</strong>. Xe đón đoàn về lại Long Xuyên, chia tay Quý khách và hẹn gặp lại.&nbsp;</li></ul>',
        4890000,
        2500000,
        0,
        NULL,
        '2OSCGVG8S9-BKTRAVEL-1686763728032',
        '2023-06-22 14:45:35',
        '2023-07-04 20:02:30',
        'NOT_STARTED'
    ), (
        11,
        'Miền Tây: Tiền Giang - Cần Thơ - Bạc Liêu - Nhà Thờ Tắc Sậy',
        'https://res.cloudinary.com/dtm4bscge/image/upload/v1686764187/fgeghjdzzzr7mbhrwk4s.jpg',
        'https://res.cloudinary.com/dtm4bscge/image/upload/v1686764189/onjei0jenblthuhkrky4.jpg',
        'https://res.cloudinary.com/dtm4bscge/image/upload/v1686764190/zsusa1gdfnczh3iemjbp.jpg',
        'https://res.cloudinary.com/dtm4bscge/image/upload/v1686764193/odwkmldjvk25pehezhuo.jpg',
        '3 ngày 2 đêm',
        'TP. Hồ Chí Minh',
        'Tiền Giang, Cù Lao Tân Phong, Làng Cổ Đông Hòa, Vĩnh Long, Chùa Phật Ngọc Xá Lợi, Cần Thơ, Chợ Nổi Cái Răng, Bạc Liêu, Nhà Thờ Tắc Sậy, Sóc Trăng',
        20,
        20,
        'Xe du lịch',
        '<h3>Ngày 1 - TP.HCM - TIỀN GIANG - CÁI BÈ - LÀNG CỔ ĐÔNG HÒA HIỆP - CÙ LAO TÂN PHONG - VĨNH LONG - CHÙA PHẬT NGỌC XÁ LỢI - CẦN THƠ (Ăn sáng, trưa, chiều)</h3><p>Xe và hướng dẫn viên đón Quý khách tại <strong>Vietravel </strong>(190 Pasteur, Quận 3, TP.HCM) khởi hành đi miền Tây theo tuyến cao tốc Trung Lương ngắm nhìn những cánh đồng lúa và màu xanh vườn tược hai bên đường.</p><p><br></p><p><strong>Đến bến tàu du lịch Cái Bè</strong>, Quý khách lên tàu khám phá dòng sông Tiền đỏ nặng phù sa, quan sát các hoạt động giao thương và đời sống của người dân; thư thái giữa bốn bề sông nước, thưởng thức trái cây và giải nhiệt cùng nước dừa tươi ngay trên thuyền.</p><p>- <strong>Làng nghề thủ công truyền thống của địa phương</strong>: lò cốm, lò bánh tráng, lò kẹo dừa, thưởng thức bánh mứt đặc sản tại địa phương; thưởng thức trà mật ong và bánh mứt đặc sản tại địa phương.</p><p>- Thuyền đưa Quý khách tham quan hệ thống <strong>Làng cổ Đông Hòa Hiệp</strong> do Tổng cục Du lịch Việt Nam cùng Tổ chức Hợp tác Quốc tế Nhật Bản (JICA) chung tay phát triển du lịch cộng đồng: tản bộ trên những con đường làng yên bình tham quan nhà cổ Ba Đức hoặc nhà cổ Anh Kiệt một trong những ngôi nhà cổ kính và đẹp nhất tại địa phương.</p><p>- <strong>Cù lao Tân Phong</strong>, đoàn ăn trưa tại nhà hàng sinh thái trải dài theo bờ sông Tiền, thưởng thức các món ăn dân dã miền sông nước.</p><p>- Tham quan vườn cây ăn trái cây rợp bóng mát (tùy theo mùa vụ) chôm chôm, ổi, mận, nhãn, sầu riêng, vú sữa…; Quý khách có thể hái trái cây và cân ký tại nhà vườn.</p><p>- Thưởng thức trái cây tươi và giao lưu đàn ca tài tử Nam Bộ.</p><p>- Trải nghiệm xuồng chèo len lỏi vào trong rạch nhỏ: dưới những tàn cây xanh mát, tận hưởng không khí trong lành, mát mẻ và ngắm nhìn khung cảnh yên bình của làng quê Nam bộ.</p><p><br></p><p>Đoàn khởi hành đi Cần Thơ, trên đường dừng chân vãn cảnh<strong> chùa Phật Ngọc Xá Lợi</strong> - kiến trúc mang nhiều phong cách nghệ thuật Phật giáo của nhiều nước trên thế giới: chiêm bái tượng Phật Bà Quan Thế Âm Bồ Tát lộ thiên cao 32 mét đứng uy nghiêm trên tòa sen hồng lớn có 9 rồng vàng uốn lượn; Tượng Phật Ngọc tạc bằng đá ngọc bích nguyên khối; chiêm ngưỡng Bảo Tháp hình lục giác 9 tầng cao nhất miền Tây.&nbsp;</p><p><br></p><p>Sau khi dùng bữa tối tại TP.Cần Thơ, Quý khách tự do dạo phố đêm khám phá “Tây Đô” lung linh sắc màu: ngắm cảnh cầu Cần Thơ về đêm; Check-in cầu Tình Yêu - thiết kế uốn lượn hình chữ S cùng hai đài sen và hệ thống đèn led rực rỡ sắc màu; Chụp ảnh tại chùa Ông cổ kính; Khám phá chợ đêm Ninh Kiều và con đường bích họa Cần Thơ xưa và nay - tái hiện nét đẹp văn hóa của người dân Cần Thơ nói riêng, vùng Đồng bằng sông Cửu Long nói chung.</p><p><br></p><p>Nghỉ đêm tại Cần Thơ.</p><h3>Ngày 2 - CẦN THƠ - CHỢ NỔI CÁI RĂNG - BẠC LIÊU - NHÀ THỜ TẮC SẬY - KDL ĐIỆN GIÓ HÒA BÌNH 1 (Ăn sáng, trưa, chiều)</h3><p>Đoàn trả phòng và khởi hành ra <strong>Bến Ninh Kiều</strong>, xuống thuyền du ngoạn trên sông Cần Thơ, nghe giới thiệu về Chợ thủy sản nước ngọt Cần Thơ; trải nghiệm Chợ nổi Cái Răng - một hình thức họp chợ đặc trưng tại các ngã sông của vùng đồng bằng sông Cửu Long, chợ nổi quy tụ hàng trăm ghe xuồng, tạo thành nơi mua bán, giao thương các loại trái cây, đặc sản sầm uất trên sông nước. Chợ Nổi Cái Răng đã được công nhận Di Sản Văn Hóa Phi Vật Thể Quốc Gia.</p><p><br></p><p>Sau khi dừng chân tham quan, mua sắm tại siêu thị đặc sản và quà lưu niệm Hương Đảo, đoàn khởi hành đi Bạc Liêu tham quan:</p><p>- <strong>Nhà công tử Bạc Liêu</strong>: do kỹ sư người Pháp thiết kế vào năm 1919, đây được xem là ngôi biệt thự bề thế nhất ở Nam kỳ lục tỉnh lúc bấy giờ. Đoàn nghe kể về giai thoại vàng son một thời của cậu Ba Huy - người được mệnh danh là “Công tử Bạc Liêu”.</p><p>- <strong>Nhà thờ Tắc Sậy</strong> - nơi an nghỉ của Linh mục Trương Bửu Diệp được nhiều người biết đến với lòng sùng mộ, nơi đây gắn liền với những câu chuyện cảm động về cuộc đời của cha Trương Bửu Diệp.&nbsp;</p><p>- <strong>KDL Điện Gió Hòa Bình 1</strong>: không chỉ chiêm ngưỡng vẻ đẹp của 26 tua bin gió khổng lồ, du khách có thể trải nghiệm đi xe điện trên con đường dẫn ra biển dài nhất Việt Nam ngắm rừng phòng hộ, bãi biển phù sa… Vào những ngày thời tiết đẹp, Quý khách có thể bắt trọn khoảnh khắc hoàng hôn đẹp nao lòng khiến du khách như lạc giữa trời Âu.</p><p>Nghỉ đêm ở Bạc Liêu.</p><h3>Ngày 3 - BẠC LIÊU - SÓC TRĂNG - KHÁM PHÁ VĂN HÓA KHMER - TP.HCM (Ăn sáng, trưa)</h3><p>Sau bữa sáng, Quý khách tham quan:</p><p>- <strong>Quảng Trường Hùng Vương</strong>: hình ảnh cây đàn kìm cách điệu (cao 18,6 m) nhạc cụ không thể thiếu trong đờn ca tài tử cải lương, biểu tượng văn hóa của tỉnh Bạc Liêu.&nbsp;</p><p>- <strong>Khu lưu niệm nghệ thuật Đờn Ca Tài Tử Nam Bộ và cố nhạc sĩ Cao Văn Lầu</strong>: một công trình khái quát về thân thế, sự nghiệp của cố nhạc sĩ Cao Văn lầu, ghi nhận công lao và tôn vinh những đóng góp to lớn của ông cho nghệ thuật Đờn ca tài tử Nam bộ và là người sản sinh ra bản Dạ cổ Hoài lang bất hủ.</p><p><br></p><p>Đoàn khởi hành đi Sóc Trăng, tham quan hai ngôi chùa nổi tiếng:&nbsp;</p><p>- <strong>Chùa Sà Lôn</strong>: còn được gọi là \"chùa Chén Kiểu\" thể hiện được nét văn hóa độc đáo của người Khmer cùng cách thiết kế sáng tạo từ hàng vạn mảnh chén được ốp trên các công trình kiến trúc của chùa.</p><p>- <strong>Chùa Wat Pătum Wôngsa Som Rông</strong> - Một quần thể kiến trúc Phật giáo rộng lớn, gồm nhiều công trình như: Chánh điện, ngôi bảo tháp “vạn người mê” đẹp tựa chùa Arun tại Thá</p>',
        3590000,
        1795000,
        0,
        NULL,
        'DEHYS6Y6BE-BKTRAVEL-1686764193409',
        '2023-06-23 14:45:35',
        '2023-07-04 20:02:30',
        'NOT_STARTED'
    ), (
        12,
        'Miền Tây - Mỹ Tho - Thới Sơn - Bến Tre',
        'https://res.cloudinary.com/dtm4bscge/image/upload/v1686764470/x2d32mkuy1sqejalq4gu.jpg',
        'https://res.cloudinary.com/dtm4bscge/image/upload/v1686764472/ijfaglcbtjoa7fcl18lz.jpg',
        'https://res.cloudinary.com/dtm4bscge/image/upload/v1686764474/wlaws1yjfwjktpnvdrib.jpg',
        'https://res.cloudinary.com/dtm4bscge/image/upload/v1686764476/zivs5w4duufhqvlf83dn.jpg',
        '1 ngày',
        'TP. Hồ Chí Minh',
        'Mỹ Tho, Thới Sơn, Bến Tre, Vườn Trái Cây, Chùa Vĩnh Tràng',
        15,
        15,
        'Xe du lịch',
        '<h3>Ngày 1 - TP.HCM - TP.HCM - MỸ THO - CỒN THỚI SƠN - BẾN TRE Số bữa ăn: 1 bữa trưa</h3><p>Quý khách tập trung tại Vietravel (190 Pasteur, P.Võ Thị Sáu, Quận 3, TP.HCM), đoàn khởi hành đến Tiền Giang tham quan chùa Vĩnh Tràng: ngôi chùa thờ phật lớn nhất tỉnh Tiền Giang, được xếp hạng di tích lịch sử - văn hóa cấp quốc gia năm 1984. Chùa mang dáng vẻ kiến trúc châu Á pha lẫn châu&nbsp;Âu, bên trong chùa vẫn mang đậm lối kiến trúc điêu khắc truyền thống Việt Nam.</p><p><br></p><p>Đoàn di chuyển đến bến tàu du lịch Mỹ Tho bắt đầu hành trình du ngoạn trên sông Mekong:</p><p>- <strong>Chiêm ngưỡng cầu Rạch Miễu</strong>: cầu dây văng đầu tiên do kỹ sư Việt Nam thiết kế và xây dựng, nghe giới thiệu các cù lao Long - Lân - Quy - Phụng.</p><p>-<strong> Ngắm nhìn cảng cá Mỹ Tho</strong>, làng nuôi cá bè dọc sông Tiền, thưởng thức nước dừa tươi trên tàu.</p><p>- <strong>Đến cù lao Thới Sơn</strong>, tản bộ trên đường làng, tham quan vườn cây ăn trái, thưởng thức các loại trái cây theo mùa và nghe đờn ca tài tử Nam Bộ.</p><p>- Đi xuồng chèo len lỏi trong rạch nhỏ ngắm nhìn phong cảnh bình dị vùng sông nước, đến tham quan trại nuôi ong mật, thưởng thức trà mật ong, rượu chuối hột…</p><p>- Tiếp tục, xuôi dòng sông Tiền đến Tân Thạch (Bến Tre) tham quan lò kẹo dừa đặc sản Bến Tre, làng nghề thủ công mỹ nghệ truyền thống. Dùng đò máy khám phá con Rạch (Tân Thạch) tìm hiểu cuộc sống thường nhật của người dân miền quê.&nbsp;</p><p>- Sau khi ăn trưa, đoàn nằm võng nghỉ ngơi, tham quan trại nuôi sấu, nhím, ếch… và đi xe đạp quan vườn cây trái, vườn dừa… Ngoài ra, Quý khách có thể tham gia các trò chơi dân gian như: đi dây, đu dây, chạy xe đạp mạo hiểm qua ván, đua xuồng chèo trên hồ, nhảy xa.</p><p><br></p><p>Trở về bến tàu, Quý khách lên xe khởi hành về TP.HCM, xe đưa đoàn về điểm đón ban đầu, kết thúc chương trình du lịch.</p>',
        599000,
        150000,
        0,
        NULL,
        'GZJIG48ORF-BKTRAVEL-1686764475890',
        '2023-06-24 14:45:35',
        '2023-07-04 20:02:30',
        'NOT_STARTED'
    ), (
        14,
        'Đà Lạt - Thác Bobla - KDL Cao Nguyên Hoa - Trang Trại rau và hoa Vạn Thành',
        'https://res.cloudinary.com/dtm4bscge/image/upload/v1688357027/l1chvavj3qipw6iuhl6m.jpg',
        'https://res.cloudinary.com/dtm4bscge/image/upload/v1688357030/wt2scno3yzqxlmbbai5g.jpg',
        'https://res.cloudinary.com/dtm4bscge/image/upload/v1688357033/graclezgpvzp66b4sadm.webp',
        'https://megadalat.com/wp-content/uploads/2021/01/nha-tho-con-ga-megadalat-08.jpg',
        '3 ngày 2 đêm',
        'TP. Hồ Chí Minh',
        'Da Lat, thac Bobla, KDL Cao Nguyen Hoa, Phan Vien Sinh Hoc, Dinh I, Puppy Farm, Gallery Chocolate, nha tho con ga',
        30,
        30,
        'Xe du lịch',
        '<h3>Ngày 1 - TP. HỒ CHÍ MINH - ĐÀ LẠT Số bữa ăn: 3 bữa (Ăn sáng, trưa, tối)</h3><p><br></p><p>Quý khách tập trung tại Vietravel (190 Pasteur, phường Võ Thị Sáu, quận 3, TP.HCM), xe đưa đoàn khởi hành đi Đà Lạt. Trên đường đi Quý khách dừng chân tham quan:</p><p>- <strong>Thác Bobla</strong>: đẹp như một bức tranh thiên nhiên với dòng thác nguyên sơ, hùng vĩ cao hơn 40m, rộng hơn 20m, cùng cảnh quan được tôn tạo tuyệt đẹp, lưu giữ nhiều cây cổ thụ hàng trăm năm tuổi, phía xa hút tầm mắt là những đồi chè, cà phê xanh mát.</p><p><br></p><p>Chiều đoàn tiếp tục hành trình về Đà Lạt, nhận phòng nghỉ ngơi. Buổi tối, Quý khách tự do thưởng thức café ngắm hồ Xuân Hương về đêm.</p><p><br></p><p><strong>Nghỉ đêm tại Đà Lạt.</strong></p><p><br></p><h3>Ngày 2 - ĐÀ LẠT – KDL CAO NGUYÊN HOA – PUPPY FARRM Số bữa ăn: 2 bữa (Ăn sáng, trưa, tự túc ăn tối)</h3><p>Đà Lạt chào đón du khách với không khí lạnh tràn về, sau khi dùng bữa sáng, xe đưa đoàn tham quan:</p><p><br></p><p>- <strong>KDL Cao Nguyên Hoa</strong>: với diện tích hơn 122ha, là nơi bảo tồn đa dạng sinh học đặc biệt là các loài hoa thân gỗ không chỉ có ở Đà Lạt mà còn trên toàn Thế giới với mảng xanh của rừng - thảm cỏ tự nhiên rộng khắp, điểm xuyến những khóm hoa Thanh Anh nhẹ nhàng dọc lối đi. Đến đây Quý khách sẽ được trải nghiệm:&nbsp;</p><p><br></p><p>+ <strong>Quán Seven-T Coffee</strong> nằm giữa rừng thông với view 360° núi đồi xanh mát, bể bơi vô cực giữa rừng nhiệt đới&nbsp;</p><p>+ Xả stress và ghi lại những khoảnh khắc đẹp với Đà Lạt Swing – trò chơi “xích đu tiên” lớn nhất Việt Nam.&nbsp;</p><p>+ <strong>Rose Garden</strong> – Vườn hoa hồng với hàng trăm gốc hồng ngoại, hồng nội, hồng cổ thụ quý hiếm tỏa hương khoe sắc bốn mùa.&nbsp;</p><p>+ Con đường rừng nhiệt đới dẫn lối đến<strong> gốc si cổ thụ nghìn năm</strong> huyền bí và cổ kính.&nbsp;</p><p>+ Thoả sức chụp hình<strong> check in với dàn siêu xe</strong> cực chill, cực chất hay ngôi nhà phù thủy, đồi mai anh đào, đồi huệ sông Nile, đồi hoa sim tím, đồi hoa hoàng yến,…</p><p><br></p><p>- <strong>Trang trại rau và hoa Vạn Thành</strong>: du khách sẽ choáng ngợp bởi vẻ quyến rũ của bức tranh tuyệt mỹ được tạo nên bởi vô vàn các loài hoa đua nhau khoe sắc như đóa Hồng, Cẩm Chướng, Lily, Đồng Tiền, Cẩm Tú Cầu… Ngoài ra, Quý khách còn được khám phá quy trình trồng những loại nông sản và thỏa sức chụp hình tại vườn cà chua, bí khổng lồ, dưa Pepino, dâu và các loại rau trồng thủy canh (tùy theo mùa).</p><p><br></p><p>Buổi chiều, đoàn tiếp tục tham quan:</p><p><br></p><p>- <strong>Nông Trại Cún Puppy Farm</strong>: đến đây, du khách thỏa thích tạo dáng cùng những chú cún siêu dễ thương hay chọn cho mình những góc chụp đẹp bên các loài hoa với đủ màu sắc rực rỡ, vườn bí ngô, dâu tây, cà chua bi, … tựa như là một Đà Lạt thu nhỏ, vô cùng thơ mộng và lãng mạn.&nbsp;</p><p><br></p><p>-<strong> Quảng trường Lâm Viên</strong>: Điểm nhấn của TP. Đà Lạt bên bờ hồ Xuân Hương với công trình nghệ thuật bông hoa dã quỳ và nụ hoa Atiso khổng lồ được thiết kế bằng kính màu, lấp lánh phản chiếu đẹp mắt bởi ánh sáng.</p><p>Buổi tối Quý khách tự do tản bộ Chợ Đà Lạt thưởng thức sữa đậu nành và bánh tráng nướng tại khu phố Tăng Bạt Hổ. Nghỉ đêm tại Đà Lạt.</p><p>- <strong>Mua sắm đặc sản Đà Lạt tại cơ sở mứt Thanh Nhu</strong>: các loại trái cây sấy giòn, sấy dẻo, nước cốt dâu tằm – dâu tươi, trà atiso, trà hoa, ...</p><p><br></p><p>Buổi tối Quý khách tự do tản bộ Chợ Đà Lạt thưởng thức sữa đậu nành và bánh tráng nướng tại khu phố Tăng Bạt Hổ.</p><p><br></p><p><strong>Nghỉ đêm tại Đà Lạt.</strong></p><p><br></p><h3>Ngày 3 - ĐÀ LẠT - TP. HỒ CHÍ MINH Số bữa ăn: 2 bữa (Ăn sáng, trưa)</h3><p>Sau khi dùng bữa sáng và trả phòng khách sạn, xe đưa đoàn tham quan:</p><p>- <strong>Nhà thờ Con Gà</strong>: đây là một trong những công trình kiến trúc tôn giáo với phong cách kiến trúc đặc trưng và tiêu biểu được coi là cổ xưa nhất của Đà Lạt. Được xây dựng từ thời Pháp nhưng đến nay vẫn giữ nguyên được nét hiện trạng ban đầu.</p><p>- <strong>Dinh I</strong>: còn được biết đến là Dinh Bảo Đại 1 – King Palace. Tọa lạc tại một ngon đồi xung quanh được bao bọc bởi những rừng thông xanh biếc. Cùng với đó lại nằm cách xa vị trí mặt tiền đường chính. Cho nên khung cảnh cũng như không gian nơi đây trở nên thơ mộng và yên bình hơn bao giờ hết.</p><p><br></p><p>Đoàn dừng tại Bảo Lộc dùng cơm trưa, sau đó khởi hành về điểm đón ban đầu. Chia tay đoàn và kết thúc chương trình du lịch.</p>',
        2790000,
        1500000,
        0,
        4,
        '32FB6LVPFK-BKTRAVEL-1688357036595',
        '2023-07-03 11:03:57',
        '2023-07-04 20:02:30',
        'NOT_STARTED'
    );

INSERT INTO
    `booked_tour_information` (
        id,
        full_name,
        email,
        phone,
        address,
        total_persons,
        adult_number,
        children_number,
        baby_number,
        note,
        total_price,
        book_time,
        account_id,
        tour_id,
        `status`
    )
VALUES (
        3,
        'Tuấn Anh',
        'tn6354103@gmail.com',
        '0966477078',
        'Ha Noi',
        1,
        1,
        0,
        0,
        '',
        599000,
        '2023-06-24 16:24:07',
        3,
        12,
        'REJECTED'
    ), (
        4,
        'Nguyen Van A',
        'vana2k@gmail.com',
        '0941556225',
        'Hai Duong',
        3,
        3,
        0,
        0,
        '',
        1797000,
        '2023-06-24 16:27:54',
        10,
        12,
        'REJECTED'
    ), (
        5,
        'Nguyen Van A',
        'tn6354103@gmail.com',
        '0966477078',
        'Ha Noi',
        1,
        1,
        0,
        0,
        '',
        7590000,
        '2023-06-28 22:07:25',
        10,
        9,
        'NOT_PAY'
    );

INSERT INTO `tourist_list`
VALUES (
        5,
        'Tuấn Anh',
        '2000-05-11',
        'MALE',
        3
    ), (
        6,
        'Nguyen Van A',
        '2000-01-01',
        'MALE',
        4
    ), (
        7,
        'Nguyen Van B',
        '1999-02-01',
        'MALE',
        4
    ), (
        8,
        'Nguyen Van C',
        '1998-02-01',
        'MALE',
        4
    ), (
        9,
        'Nguyen Van An',
        '2000-01-01',
        'MALE',
        5
    );

INSERT INTO
    `tourist_attraction`
VALUES (
        1,
        'Đà Lạt',
        'https://gonatour.vn/vnt_upload/news/08_2021/du_lich_da_lat.jpg',
        'Du lịch Đà Lạt mộng mơ',
        'Đà Lạt luôn nằm trong top các thành phố nhất định phải đến du lịch một lần trong đời. Đến với thành phố mộng mơ này, hẳn bạn sẽ choáng ngợp với vô số cảnh đẹp và thiên nhiên nơi đây? Hãy cùng BK Travel tìm hiểu nhé!',
        '2023-06-11 20:36:34'
    ), (
        2,
        'Đà Nẵng',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/DJI_0550-HDR-Pano.jpg/800px-DJI_0550-HDR-Pano.jpg',
        'Du lịch Đà Nẵng',
        'Đà Nẵng nằm giữa ba di sản thế giới: cố đô Huế, phố cổ Hội An và thánh địa Mỹ Sơn. Đà Nẵng còn có nhiều danh thắng tuyệt đẹp say lòng du khách như Ngũ Hành Sơn, Bà Nà, bán đảo Sơn Trà, đèo Hải Vân, sông Hàn thơ mộng và cầu quay Sông Hàn – niềm tự hào của thành phố, và biển Mỹ Khê đẹp nhất hành tinh.',
        '2023-06-11 20:45:03'
    ), (
        3,
        'Phú Quốc',
        'https://nld.mediacdn.vn/291774122806476800/2021/9/7/3-chot-3-1630978256337659996993.jpg',
        'Du lịch đảo Phú Quốc',
        'Phú Quốc là điểm nghỉ dưỡng, tham quan, và khám phá sinh thái tuyệt vời. Mũi Ông Đội, Đá Chào là thế giới san hô và cá biển sặc sỡ. Bãi Sao cát trắng mịn, dáng cong, nước xanh ngọc bích. Đặc sản danh tiếng cả nước là tiêu sọ, nước mắm, rượu sim, ngọc trai. Phú Quốc thực sự là một viên ngọc quý trên bản đồ Việt Nam.',
        '2023-06-11 20:53:21'
    ), (
        4,
        'Hà Nội',
        'https://pdp.edu.vn/wp-content/uploads/2021/05/hinh-nen-ha-noi-ve-ho-guom-mua-he-duoi-goc-cay-phuong.jpg',
        'Du lịch Hà Nội',
        'Hà Nội là thủ đô ngàn năm văn hiến, còn lưu dấu nhiều di tích như Hồ Gươm, Cầu Thê Húc, Chùa Quán Sứ, Hồ Tây, 36 phố phường. Hà Nội có bốn mùa, luôn mang đến nhiều hoài niệm khó phai, mỗi mùa một vẻ, xuân lễ hội, hạ tươi thắm, thu quyến rũ và đông ấn tượng. Món ngon có Phở, Chả cá Lã Vọng, bánh tôm Hồ Tây.',
        '2023-06-11 20:59:49'
    ), (
        5,
        'Đại học Bách Khoa Hà Nội',
        'https://xdcs.cdnchinhphu.vn/446259493575335936/2022/12/5/bkhn-c1-16702142784341515744966.jpg',
        'Tham quan Đại học Bách Khoa Hà Nội - Đại học kỹ thuật hàng đầu Việt Nam',
        'Đại học Bách khoa Hà Nội (BKHN; tiếng Anh: Hanoi University of Science and Technology – HUST, mã đại học: BKA) là đại học chuyên ngành kỹ thuật có trụ sở tại Hà Nội, Việt Nam. Đại học Bách khoa Hà Nội được xem là một trong những đại học kỹ thuật lớn nhất Việt Nam, trực thuộc Bộ Giáo dục và Đào tạo và được xếp vào nhóm các đại học trọng điểm quốc gia. Cùng khám phá các địa điểm nổi tiếng trong trường nhé!',
        '2023-06-11 21:13:48'
    ), (
        6,
        'Thanh Hóa',
        'https://congthuong-cdn.mastercms.vn/stores/news_dataimages/2023/042023/15/11/in_article/0207-tp-thanh-hoa-685x47720230415112248.jpg?rt=20230415112249',
        'Những điểm du lịch Thanh Hóa được yêu thích nhất 2023',
        'Điểm du lịch Thanh Hóa nào đẹp, nên khám phá? Đây là câu hỏi của không ít du khách trước khi đặt chân đến xứ Thanh - nơi vừa có biển rộng, vừa có núi cao, vừa có những miền đất yên bình, vừa có thành phố ồn ào, tấp nập bất kể ngày đêm.',
        '2023-07-02 03:51:18'
    );

INSERT INTO
    `touratt_blog_content`
VALUES (
        1,
        'Hồ Tuyền Lâm',
        'Khi nhắc đến các địa điểm du lịch Đà Lạt, chắc chắn là không thể thiếu Hồ Tuyền Lâm. Hồ Tuyền Lâm đã vô cùng nổi tiếng vì là hồ nước tự nhiên đẹp nhất tại xứ sở mù sương. Bao quanh bởi núi non trập trùng, rừng thông phủ sương. Tất cả tạo nên một vẻ đẹp nên thơ, trữ tình mà bạn không thể bỏ lỡ khi đến Đà Lạt. Nếu đã mệt mỏi với thành phố xô bồ, ồn ã, hãy về đây để được hòa mình vào thiên nhiên. \nNhững bạn năng động, muốn được tham gia những hoạt động náo nhiệt cũng đừng lo nhé! Hồ Tuyền Lâm còn cung cấp những hoạt động giải trí vô cùng hấp dẫn. Như là: đi cano, chèo thuyền kayak, đạp xe… Đặc biệt khi đến đây, bạn sẽ không mất phí tham quan.',
        'https://dalatpalace.vn/wp-content/uploads/2020/03/ho-tuyen-lam-co-gi-choi-768x512-1.jpg',
        1
    ), (
        2,
        'Thung lũng Tình Yêu',
        'Thung lũng Tình Yêu cũng nằm trong top những địa điểm đẹp ở Đà Lạt. Thung Lũng Tình Yêu nằm sâu trong sườn đồi, được bao quanh bởi rừng thông xanh ngát. Vì lẽ đó, khí hậu nơi đây rất dễ chịu và mát mẻ. \nĐược thiên nhiên và khí hậu ưu ái, ta có thể chiêm ngưỡng mọi loài hoa khoe sắc tại thung lũng. Nếu đã đến đây, bạn hãy đến đồi Vọng Cảnh nhé!',
        'https://dalat-info.gov.vn:444/uploads/20220830151141thung-lung-tinh-yeu-da-lat2.jpg',
        1
    ), (
        3,
        'Đường hầm điêu khắc – Làng Đất Sét',
        'Đường hầm điêu khắc Đà Lạt còn có tên gọi khác là đường hầm đất sét. Địa điểm du lịch Đà Lạt này thuộc một trong những công trình kiến trúc nổi bật nhất của xứ sở ngàn hoa. \nĐường hầm điêu khắc Đà Lạt nổi tiếng khi được công nhận là đường hầm dài nhất thế giới được làm từ đất sét. Trong đó nổi bật với một số công trình đạt kỷ lục quốc gia. \nKhu du lịch đường hầm điêu khắc Đà Lạt lọt top những địa điểm đang hot ở Đà Lạt nằm ở phường 4 thành phố Đà Lạt. ',
        'https://kienviet.net/wp-content/uploads/2020/12/1-13.jpg',
        1
    ), (
        4,
        'Cầu quay sông Hàn',
        'Nổi tiếng nhất Đà Nẵng là chiếc cầu quay đầu tiên của Việt Nam do chính kỹ sư người Việt thiết kế. Cầu sẽ quay 90 độ từ 01:00 – 04:00 ngày thường và 23:00 – 24:00 ngày cuối tuần để phục vụ nhu cầu tham quan của du khách.',
        'https://ik.imagekit.io/tvlk/blog/2016/12/tron-bo-bi-kip-du-lich-da-nang-3.jpg?tr=dpr-2,w-675',
        2
    ), (
        5,
        'Cầu Rồng Đà Nẵng',
        'Hình tượng con rồng uốn lượn suốt chiều dài cây cầu lớn đã trở thành một biểu tượng của Đà Nẵng. Vào mỗi 21:00 thứ bảy, chủ nhật, và các ngày lễ hội, cầu sẽ phun lửa và phun nước cực kỳ hoành tráng. Nếu du lịch Đà Nẵng đúng dịp cuối tuần, bạn đừng nên bỏ qua khung cảnh này nhé.',
        'https://ik.imagekit.io/tvlk/blog/2016/12/tron-bo-bi-kip-du-lich-da-nang-4.jpg?tr=dpr-2,w-675',
        2
    ), (
        6,
        'Biển Mỹ Khê',
        'Tọa lạc tại vị trí trung tâm thành phố, Mỹ Khê được công nhận là một trong những bãi biển đẹp nhất hành tinh và là điểm đến nổi tiếng nhất của mọi chuyến du lịch Đà Nẵng. Bên cạnh biển xanh cát trắng, biển Mỹ Khê còn thu hút với các trò chơi thể thao dưới nước như dù lượn, lướt ván và lặn ngắm san hô.\nCách đến bãi biển Mỹ Khê: Đi dọc đường Phạm Văn Đồng, qua khỏi cầu quay Sông Hàn là đến',
        'https://ik.imagekit.io/tvlk/blog/2016/12/tron-bo-bi-kip-du-lich-da-nang-6.jpg?tr=dpr-2,w-675',
        2
    ), (
        7,
        'Bán đảo Sơn Trà',
        'Cách trung tâm thành phố chỉ 8 km chính là Sơn Trà - hệ sinh thái rừng nguyên sinh giáp biển duy nhất tại Việt Nam. Du khách tha hồ khám phá vẻ đẹp kì vĩ của thiên nhiên với cây đa ngàn năm, hay đỉnh núi Bàn Cờ - nơi ngắm cảnh Đà Nẵng đẹp nhất từ trên cao. Ngoài ra, bán đảo Sơn Trà còn có ngôi chùa Linh Ứng Bãi Bụt với vị trí “tựa núi, hướng biển”, mang đến phong cảnh bình yên mà hữu tình cho du khách viếng cảnh chùa.',
        'https://ik.imagekit.io/tvlk/blog/2016/12/tron-bo-bi-kip-du-lich-da-nang-7.jpg?tr=dpr-2,w-675',
        2
    ), (
        8,
        'Đèo Hải Vân',
        'Nếu là người đam mê chinh phục thiên nhiên thì hẳn bạn không thể bỏ qua đèo Hải Vân với cung đường uốn lượn – một bên là vách núi cao, một bên là biển xanh và những đám mây trắng sà lưng chừng sườn núi.',
        'https://ik.imagekit.io/tvlk/blog/2016/12/tron-bo-bi-kip-du-lich-da-nang-9.jpg?tr=dpr-2,w-675',
        2
    ), (
        9,
        'Vườn quốc gia Phú Quốc',
        'Vườn quốc gia Phú Quốc có diện tích hơn 31.400 ha, là nơi sinh sống của hàng trăm loài động, thực vật và đa dạng hệ sinh thái núi, rừng, biển, thác, suối. Ở đây, bạn sẽ được khám phá thảm thực vật tươi tốt, chiêm ngưỡng những con suối tinh khiết như suối Tranh, suối Đá Bàn, suối Đá Ngọn. Nếu tham gia tour 4 tiếng, du khách sẽ chinh phục đỉnh Núi Chúa, với độ cao 565 m và chiêm ngưỡng cảnh vật mênh mông, nhiều màu sắc của công viên.',
        'https://vietrektravel.com/ckeditor/plugins/fileman/Uploads/phuoc%20binh/vuon-quoc-gia-phu-quoc-1.jpg',
        3
    ), (
        10,
        'Mũi Gành Dầu',
        'Mũi Gành Dầu là mô đất nhô ra biển, nằm ở phía tây bắc đảo. Do đường đi xa và chưa có nhiều du khách đến tham quan, mũi Gành Dầu mang vẻ đẹp hoang sơ với những ghềnh đá nhiều hình thù và bãi biển trong xanh.\nTrong hành trình khám phá bắc đảo, du khách có thể ghé thăm các vườn tiêu, mua đặc sản đảo ngọc về làm quà. Các vườn tiêu gợi ý ở Khu Tượng, nơi trồng nhiều tiêu nhất, trên đường đi xã Bãi Thơm. Ngoài ra, trên đường đi Gành Dầu cũng có nhiều vườn tiêu để bạn tham quan, chụp ảnh.',
        'https://owa.bestprice.vn/images/articles/uploads/kinh-nghiem-du-lich-ganh-dau-phu-quoc-moi-nhat-5ebbcb2a651dd.jpg',
        3
    ), (
        11,
        'Bãi Sao',
        'Bãi Sao là một trong những bãi biển đẹp nhất Phú Quốc, thuộc thị trấn An Thới, cách thị trấn Dương Đông khoảng 28 km. Nơi đây có làn nước trong xanh, nổi bật trên dải cát màu trắng mịn dài hơn 7 km. Tới đây, du khách có thể thong dong trên những bờ cát, lắng nghe tiếng sóng rì rào vào bình minh hay tắm biển, lưu lại những bức ảnh đẹp.\nNgoài ra, nơi này nước lặng, sóng êm nên có nhiều hoạt động thể thao dưới nước, nổi bật là chèo thuyền kayak. Giá thuyền cho thuê từ 100.000 - 150.000 đồng.',
        'https://i1-dulich.vnecdn.net/2022/04/08/shutterstock-1492074758-1641-1-7552-3298-1649405356.jpg?w=0&h=0&q=100&dpr=1&fit=crop&s=04hLfh8nziv-hqDOwvkaBQ',
        3
    ), (
        12,
        'Nhà tù Phú Quốc',
        'Nhà tù Phú Quốc nằm tại xóm Cây Dừa, xã An Thới. Di tích là địa điểm tham quan thu hút du khách, được phục dựng một số cảnh để tái hiện lịch sử; mở cửa từ 7h đến 17h hàng ngày và miễn phí vé.',
        'https://statics.vinpearl.com/nha-tu-phu-quoc-2_1627870564.jpg',
        3
    ), (
        13,
        'Chùa Một Cột ',
        'Đây là ngôi chùa độc đáo nhất ở Việt Nam. Chùa Một Cột được xây dựng vào năm 1049, dưới thời vua Lý Thái Tông. Kết cấu của chùa khá độc đáo bao gồm: cột trụ, đài Liên hoa và mái chùa. Đường kính của cộng đá rộng đến 1,2m và là nơi nâng đỡ cho toàn bộ phần trên của ngôi chùa. Chính vì vậy, nếu có dịp du lịch Hà Nội, bạn đừng quên ghé chùa Một Cột để tham quan và cầu nguyện.',
        'https://nucuoimekong.com/wp-content/uploads/chua-mot-cot-768x432.jpg',
        4
    ), (
        14,
        'Quảng trường Ba Đình – Lăng Bác',
        'Quảng trường Ba Đình là quảng trường lớn nhất ở Việt Nam. Đây là địa điểm mà bất cứ du khách nào cũng muốn đặt chân đến khi du lịch Hà Nội. Quảng trường Ba Đình là niềm tự hào của người dân Việt Nam vì đây là nơi đã từng diễn ra một sự kiện trọng đại của toàn dân tộc: Ngày 2/9/1945, tại quảng trường Ba Đình, Chủ tịch Hồ Chí Minh đã đọc Bản Tuyên ngôn Độc lập khai sinh ra nước Việt Nam Dân chủ Cộng hòa. Ngoài ra, sau khi đã tham quan quảng trường, bạn đừng quên ghé qua lăng để thăm viếng Bác nhé. Phía sau quảng trường là Lăng Chủ Tịch Hồ Chí Minh. Nơi đây mang một bầu không khí vô cùng trang nghiêm.',
        'https://nucuoimekong.com/wp-content/uploads/quang-truong-ba-dinh-768x432.jpg',
        4
    ), (
        15,
        'Hồ Gươm – Điểm đến không thể bỏ qua khi du lịch Hà Nội',
        'Nếu bạn không biết du lịch 1 ngày ở Hà Nội nên đi đâu thì đây chính là sự lựa chọn tuyệt vời. Lang thang Hồ Gươm, ngắm nhìn Tháp Rùa cổ kính giữa lòng Hà Nội. Với không gian thoáng đãng, trong lành; nơi đây thường được rất nhiều bạn trẻ yêu thích. Ngoài ra, xung quanh Hồ Gươm còn là các di sản có giá trị văn hóa – lịch sử như: Tháp Bút, đền Ngọc Sơn, cầu Thê Húc,… Nếu có dịp đặt chân đến đây, bạn nhất định phải lưu lại những bức ảnh kỷ niệm tại địa danh này nhé.',
        'https://ik.imagekit.io/tvlk/blog/2022/08/ho-guom-15-1024x684.jpg?tr=dpr-2,w-675',
        4
    ), (
        16,
        'Làng gốm Bát Tràng – Địa điểm du lịch Hà Nội trong ngày',
        'Làng gốm Bát Tràng nằm ở ven sông Hồng. Nơi đây chuyên sản xuất các loại sản phẩm gốm khác nhau như: chén, đĩa, tô, bình hoa,…. Đến đây, bạn sẽ có cơ hội ngắm nhìn các nghệ nhân làm ra những sản phẩm gốm đầy tinh tế. Ngoài ra, bạn cũng đừng quên mua một vài món đồ gốm về làm quà cho người thân và bạn bè nhé.',
        'https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/06/du-lich-lang-gom-bat-trang-1.jpg',
        4
    ), (
        17,
        'Cầu Long Biên',
        'Nhắc đến địa điểm du lịch Hà Nội nổi tiếng thì không thể bỏ qua Cầu Long Biên. Đây là cây cầu thép đầu tiên bắt qua sông Hồng và được thực dân Pháp xây dựng vào năm 1898. Mặc dù đã trải qua thăng trầm của thời gian nhưng Cầu Long Biên vẫn giữ được vẻ đẹp cổ kính. Chính vì vậy, du khách thường lựa chọn những quán cà phê gần đây hoặc đặt chân trực tiếp lên Cầu Long Biên để lưu lại những bức ảnh kỷ niệm.',
        'https://nucuoimekong.com/wp-content/uploads/cau-long-bien-768x432.jpg',
        4
    ), (
        18,
        'Thư viện Tạ Quang Bửu',
        '1. Thư viện trường Đại học Bách Khoa Hà Nội được thành lập từ năm 1956, ngay sau ngày thành lập trường. Năm 2008, thư viện của trường chính thức tách ra hoạt động độc lập, đổi tên thành thư viện Tạ Quang Bửu.\nn2. Thư viện Tạ Quang Bửu là một trong những thư viện lớn nhất Việt Nam với 10 tầng, có tổng diện tích 37 nghìn mét vuông, rất thuận tiện cho việc học tập và nghiên cứu của sinh viên.\nn3. Thư viện có phòng đọc, phòng máy, phòng hội thảo, phòng học... rộng thênh thang và có khả năng phục vụ 2000 sinh viên với 60000 đầu sách khác nhau. Chính vì thế các em có thể thoải mái học bài mà không sợ hết chỗ vào những ngày ôn thi mệt mỏi.\nn4. Là thư viện Việt Nam đầu tiên trở thành thành viên của tổ chức thư viện thế giới OCLC.\nn5. Các em còn có thể truy cập trang web riêng của thư viện để tìm hiểu cách sử dụng, tra cứu tài liệu, thông tin...\nn6. Tại đây cũng là nơi diễn ra rất nhiều hoạt động khác như hội thảo, triển lãm và các buổi tham quan dành cho tân sinh viên.',
        'https://upload.wikimedia.org/wikipedia/commons/5/53/Th%C6%B0_vi%E1%BB%87n_T%E1%BA%A1_Quang_B%E1%BB%ADu_.jpg',
        5
    ), (
        19,
        'Hồ Tiền - Không gian ngập tràn hoa súng',
        'Các bạn trẻ của Trường ĐH Bách khoa Hà Nội giờ đây không cần phải đi xa mà vẫn có thể thả mình trong không gian ngập tràn hoa súng để thư giãn sau những giờ học căng thẳng.\nNhiều người không khỏi bất ngờ khi trong một ngôi trường đại học thường nhắc đến với những ngành học thiên về kỹ thuật, nghiên cứu bỗng xuất hiện một hồ hoa súng đầy lãng mạn.\nTrong tiết trời lãng đãng mùa thu, hồ hoa súng ngay trong khuôn viên của Trường ĐH Bách khoa Hà Nội nhanh chóng hút sự chú ý của các bạn sinh viên.\nHoa súng được trồng trong hồ Tiền nằm ngay cạnh thư viện Tạ Quang Bửu. Hoa bắt đầu được trồng từ năm 2016 vì vậy đây cũng là mùa đầu tiên hoa nở ở mặt hồ.\nKhông gian mát mẻ đầy hoa súng là nơi các bạn trẻ có thể đi dạo hoặc ngồi tận hưởng không khí mát mẻ, thư giãn sau một ngày dài học tập căng thẳng.\nĐây trở thành địa điểm cho các bạn trẻ thỏa thích chụp ảnh và cũng là nơi hẹn hò đầy lãng mạn của nhiều cặp đôi.',
        'https://images.spiderum.com/sp-images/4386fac03fb611ec9478e96cbe43e4e5.jpeg',
        5
    ), (
        20,
        'Tòa D9 đại học bách khoa',
        'Nơi các bạn sinh viên dành cả thanh xuân để học và qua môn, nơi đầy ắp những tiếng xe máy, xe đạp trước giờ vào lớp. Những phòng học vang lên tiếng thầy cô và tiếng cọt kẹt của phấn bảng.',
        'https://upload.wikimedia.org/wikipedia/vi/0/0c/NhaD9BK.jpg',
        5
    ), (
        21,
        'Du lịch Sầm Sơn Thanh Hóa',
        'Cách trung tâm thành phố Thanh Hóa chỉ 16km, mỗi dịp hè về, Sầm Sơn đều đón chào rất nhiều du khách trong và ngoài nước tới đây vui chơi, nghỉ dưỡng. Bãi tắm Sầm Sơn rộng, sóng to, cát trắng mịn và có nhiều điểm giải trí hấp dẫn nên đặc biệt hút khách.\n\nDu lịch Sầm Sơn Thanh Hóa, bạn không chỉ được tắm biển thỏa thích, tham gia các trò chơi dưới nước như dù bay, mô tô nước,... mà còn thỏa sức ngắm cảnh bình minh hay hoàng hôn đẹp chất ngất trên biển. Đơn giản hơn là đi dạo bờ biển về đêm để tận hưởng trọn vẹn sự lãng mạn của biển cả, đạp xe đạp đôi quanh những con đường ven biển xinh đẹp hoặc tham gia kéo lưới cùng với dân chài vào buổi sớm mai,…\n\nTại Sầm Sơn còn có rất nhiều điểm tham quan, vui chơi thú vị bạn nên ghé thăm như: Thủy Tiên Cung (nằm dưới chân núi Trường Lệ), chùa Độc Cước, hòn Trống Mái, chùa Cô Tiên,... ',
        'https://statics.vinpearl.com/852c8941adf2d38d11057833_865994843463395_4346437367188169658_n_1661235342.jpg',
        6
    ), (
        22,
        'Thành nhà Hồ - điểm du lịch Thanh Hóa không nên bỏ lỡ',
        'Đây chính là điểm đầu tiên của con đường di sản miền Trung vô cùng thú vị đang chờ bạn khám phá. Du lịch Thanh Hóa, bạn phải ghé ngay di tích thành nhà Hồ sừng sững cùng năm tháng từ đời vua Hồ Quý Ly với kiến trúc kinh thành độc đáo và tráng lệ. Trải qua ngót nghét 600 năm với những thăng trầm của lịch sử cùng ảnh hưởng của thời tiết mà tường thành phía ngoài vẫn còn khá nguyên vẹn.\n\nToàn bộ khung thành được xây dựng bằng nhiều phiến đá vôi màu xanh được đục đẽo kỳ công, tinh xảo, vuông vắn xếp chồng khít lên nhau. Mỗi phiến đá dài khoảng 1.5 m, có tấm lên đến 6m, được xếp chồng lên nhau mà không cần bất kì một chất kết dính nào. Qua năm tháng, tường thành vẫn hiên ngang sừng sững cho đến ngày nay.',
        'https://statics.vinpearl.com/diem-du-lich-thanh-hoa-1_1661310832.jpg',
        6
    ), (
        23,
        'Du lịch suối cá thần Thanh Hóa',
        'Thanh Hóa là miền đất nổi tiếng với nhiều danh lam thắng cảnh đẹp. Một trong những điểm đến tâm linh, sinh thái nhất nhì quê hương điệu hò sông Mã chính là suối cá thần Cẩm Lương. Suối cá thần Thanh Hóa là một tuyệt phẩm của tạo hóa ban tặng. Nơi đây không chỉ nổi tiếng bởi vẻ hoang sơ, mộc mạc mà còn gắn liền với những huyền tích kỳ bí từ xa xưa.\n\nĐây là dòng suối Ngọc nằm dưới chân núi Trường Sinh, có hàng nghìn con cá chen chúc, gắn với những câu chuyện lưu truyền của người dân nơi đây. Gần suối có hang núi rất đẹp, gọi là động Cây Đăng.\n\nTrong động có thạch nhũ mang nhiều hình thù đẹp mắt. Nếu may mắn, bạn có thể được thấy cá chúa nặng lên tới 30kg. Điều đặc biệt là mặc dù rất nhiều cá chen chúc nhau nhưng nước ở đây vẫn rất trong. Bạn hãy dừng chân tại suối cá thần khi đến xứ Thanh để tận hưởng không khí trong lành của núi rừng và nghe những câu chuyện huyền tích, thưởng thức đặc sản nơi đây nhé!',
        'https://statics.vinpearl.com/diem-du-lich-thanh-hoa-5_1623941036.jpg',
        6
    ), (
        24,
        'Khu di tích Lam Kinh',
        'Lam Kinh (hay còn gọi là Tây Kinh) là điểm du lịch Thọ Xuân Thanh Hóa, cách thành phố Thanh Hoá 52 km về phía Tây Bắc. Khu di tích lịch sử Lam Kinh rộng khoảng 30 ha, gồm những lăng mộ, đền miếu và một hành cung của các vua nhà Hậu Lê mỗi lần về bái yết tổ tiên.\n\nThánh điện Lam Kinh phía Bắc dựa vào núi Dầu, phía trước thành hướng Nam và nhìn ra sông Chu - có núi Chúa làm bình phong. Bên trái thánh điện là rừng Phú Lâm, bên phải là núi Hương và núi Hàm Rồng chắn phía Tây - nơi người anh hùng Lê Lợi dựng cờ khởi nghĩa chống quân Minh xâm lược.\n\nĐến với khu di tích Lam Kinh, bạn không những có thể thắp hương bái Phật, vãng cảnh chùa thanh tịnh mà còn được lắng nghe, tìm hiểu những câu chuyện lịch sử vô cùng thú vị nữa đó.',
        'https://statics.vinpearl.com/diem-du-lich-thanh-hoa-6_1623941061.jpg',
        6
    ), (
        25,
        'Pù Luông - địa điểm check-in Thanh Hóa siêu đẹp',
        'Khu bảo tồn thiên nhiên Pù Luông cách thành phố Thanh Hóa 130km về phía Tây Bắc và cách Hà Nội khoảng 150km. Đường đến Pù Luông dù đi từ hướng Hà Nội hay Thanh Hóa đều rất dễ đi, ngay cả những đoạn đường đèo.\n\nTại Pù Luông, bạn có thể ngắm nhìn những bản làng được bao quanh bởi ruộng bậc thang, những cánh rừng xanh mát xen lẫn những dãy núi trập trùng cùng con suối và dòng thác mát rượi.',
        'https://statics.vinpearl.com/diem-du-lich-thanh-hoa-7_1623941097.jpg',
        6
    ), (
        26,
        'Khu du lịch Bến En Thanh Hóa',
        'Vườn quốc gia Bến En điểm du lịch sinh thái hấp dẫn với núi, rừng, sông, hồ. Đặc biệt ở đây có hồ sông Mực rộng 3.000ha với hơn 20 hòn đảo lớn nhỏ. Đi thuyền trên sông và thưởng thức những món ăn từ cá mè, khám phá phong tục tập quán của người Thái chắc chắn sẽ là những trải nghiệm đáng nhớ ở khu du lịch Bến En của mọi du khách.\n\nDu ngoạn trên hồ vào buổi bình minh, khi những hòn đảo còn mập mờ trong sương trắng, bạn sẽ có cảm giác lạc vào thế giới thần tiên với sông nước mây trời hư ảo. Ẩn hiện giữa sông nước là những hòn đảo với tên gọi đậm chất trữ tình: Tình Yêu, Hạnh Phúc, Núi Đôi, Hy Vọng,…',
        'https://statics.vinpearl.com/diem-du-lich-thanh-hoa-14_1623941386.jpg',
        6
    );