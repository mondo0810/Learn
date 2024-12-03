<link rel="stylesheet" href="/includes/slide5.css">

<?php
// Kết nối database và thông tin chung
require_once(realpath($_SERVER["DOCUMENT_ROOT"]) . '/core/init.php');
$get_info = new Info;
$input = new Input;

$page = (int) $input->input_post("page");



// Mảng chứa các tab và thông tin liên quan đến mỗi tab
$tabs = [
    ['name' => '1', 'time' => '20:00', 'status' => 'Đang Diễn Ra', 'class' => 'active', 'page' => 1],
    ['name' => '2', 'time' => '22:00', 'status' => 'Sắp Diễn Ra', 'class' => 'dadienra', 'page' => 2],
    ['name' => '3', 'time' => '01:00', 'status' => 'Sắp Diễn Ra', 'class' => 'dadienra', 'page' => 3]
];

?>
<div class="uudai-time uudai-time-bg">
    <div class="uudai--title">
        <img src="https://i.imgur.com/eLV5Hj1.png">
        <h3>GIỜ VÀNG GIẢM GIÁ</h3>
    </div>
    <div class="uudai--detail">
        <ul class="menu-tab">
            <?php foreach ($tabs as $tab): ?>
                <li class="<?= $tab['class']; ?>" data-tab="tab<?= $tab['name']; ?>">
                    <div>
                        <p><?= $tab['time']; ?></p>
                        <sub><?= $tab['status']; ?></sub>
                    </div>
                </li>
            <?php endforeach; ?>
        </ul>
    </div>
</div>

<div class="slider-container">
    <?php foreach ($tabs as $tab): ?>
        <div class="tab-content tab<?= $tab['name']; ?> <?= $tab['name'] == 1 ? 'active' : ''; ?>">
            <div class="jscroll-inner slider-wrapper">
                <?php

                // Xác định nhóm cho từng tab
// Sử dụng tab['name'] để phân biệt các nhóm
                $tabtime = new DateTime();
                $tabtime->setTimezone(new DateTimeZone('Asia/Ho_Chi_Minh'));

                // Lấy giờ hiện tại
                $currentHour = $tabtime->format('H');

                // Tính toán nhóm cho từng tab (mỗi tab có nhóm riêng nhưng nhóm thay đổi theo giờ)
                $currentGroup = ($currentHour + $tab['name'] - 1) % 3; // Công thức phân nhóm
            
                // Mệnh đề WHERE chọn các id thuộc nhóm tương ứng
                $where = "`status` = '0' AND `id` % 3 = $currentGroup";

                // Lấy dữ liệu cho từng tab
                $sql_get = "SELECT * FROM `products` WHERE $where ORDER BY id DESC LIMIT 5 ";

                $results = $db->fetch_assoc($sql_get, 0);
                // Lặp qua kết quả truy vấn và hiển thị sản phẩm
                if (is_array($results) && !empty($results)) {
                    foreach ($results as $data): ?>
                        <div class="sa-lpcol">
                            <div class="sa-lpi" style="border-image: url(/assets/images/diamond.png) 25 round;">
                                <a class="sa-lpimg" href="/accounts/<?= $data['id']; ?>.html">
                                    <p class="sa-lpping">
                                        <img src="<?php echo $get_info->get_thumb($data['id']); ?>" alt="Ảnh">
                                    </p>
                                    <div class="sa-lpinfo">
                                        <div class="sa-lpits mcustomscrollbar mCustomScrollbar _mCS_2 mCS_no_scrollbar">
                                            <div id="mCSB_2" class="mCustomScrollBox mCS-light mCSB_vertical mCSB_inside"
                                                style="max-height: 197px;" tabindex="0">
                                                <div id="mCSB_2_container" class="mCSB_container mCS_y_hidden mCS_no_scrollbar_y"
                                                    style="position:relative; top:0; left:0;" dir="ltr">
                                                    ● Rank: <?= $get_info->get_string_rank($data['rank']); ?><br />
                                                    ● Skin Súng: <?= $data['champs_count']; ?><br />
                                                    ● Trang Phục: <?= $data['skins_count']; ?><br />
                                                    <?= $data['gem_count']; ?><br />
                                                    <?php if ($data['note']): ?>
                                                        ● <?= $data['note'] ?>
                                                    <?php endif; ?>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                <div class="sa-lpbott clearfix">
                                    <p class="sa-lpbpice" style="
    display: inline;
"><del>             <?= number_format($data['price'] / 0.1); ?><sup>Đ</sup></del></p>
                                    <small class="discount">
                                        <svg style="
    fill: #ff4040;
    width: 10px;
    display: block;
" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                            <path
                                                d="M0 256L28.5 28c2-16 15.6-28 31.8-28H228.9c15 0 27.1 12.1 27.1 27.1c0 3.2-.6 6.5-1.7 9.5L208 160H347.3c20.2 0 36.7 16.4 36.7 36.7c0 7.4-2.2 14.6-6.4 20.7l-192.2 281c-5.9 8.6-15.6 13.7-25.9 13.7h-2.9c-15.7 0-28.5-12.8-28.5-28.5c0-2.3 .3-4.6 .9-6.9L176 288H32c-17.7 0-32-14.3-32-32z" />
                                        </svg>
                                        <i class="bx bxs-zap"></i><span class="discount-text"> -90%</span>
                                    </small>

                                    <p class="sa-lpbpice" style="
    font-size: 16px;
">             <?= number_format($data['price']); ?><sup>Đ</sup></p>
                                    <div class="gg-info">
                                        <div class="gg-lpbif1">
                                            <p class="hero"> Skin Súng: <?= $data['champs_count']; ?></p>
                                            <p class="skin"> Trang Phục: <?= $data['skins_count']; ?></p>
                                        </div>
                                        <div class="gg-lpbpri1">
                                            <p class="hero"> <?= $data['type_account'] == 'PUBG Mobile' ? 'Level' : 'Pet'; ?>:
                                                <?= $data['gem_count']; ?>
                                            </p>
                                            <p class="skin"><?= $get_info->get_string_rank($data['rank']); ?></p>
                                        </div>
                                    </div>
                                    <br>
                                    <div>
                                        <p style="color: #f0b252;"></p>
                                        <a href="/accounts/<?= $data['id']; ?>.html" class="xem-acc" title="XEM ACC"
                                            style="color:white;">XEM ACC #<?= $data['id']; ?></a>
                                    </div>
                                    <br>
                                    <div>
                                        <a class="sa-lpbbtn ac-buy-acc" style="
    color: white;
" onclick="buy_acc(<?= $data['id']; ?>);">MUA NGAY</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <?php endforeach; ?>

                <?php } else { ?>
                    <p class="notfound">Chưa có sản phẩm khuyến mãi tại khung giờ này</p>
                <?php } ?>
                <style>
                    .notfound {
                        margin: 10px auto;
                        font-size: 16px;
                        width: 60%;
                        text-align: center;
                    }
                </style>
            </div>
            <button class="slider-prev">❮</button>
            <button class="slider-next">❯</button>
        </div>
    <?php endforeach; ?>

</div>

<div class="clearfix"></div>
<script src="/includes/slide5.js"></script>