<template>
    <div class="wrapper">
        <div class="content">
            <div class="left">
                <span class="header">Lỗi 404</span>
                <h3 class="title">Không tìm thấy trang</h3>
                <span class="description"> Trang bạn đang tìm kiếm không tồn tại </span>
            </div>
            <div>
                <img src="https://gitman.vn/assets/error404.1cbcaa48.svg" height="60vh" alt="">
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.wrapper {
    display: flex;
    align-items: center;
    width: 60%;
    height: 100vh;
    margin: auto;

    .content {
        display: flex;
        padding: 40px 60px;
        border-radius: 10px;
        background-color: #f8f8f8;

        .left {
            align-self: center;
        }

        .header {
            color: red;
            font-size: 16px;
            font-weight: 600;
        }

        .title {
            margin: 20px 0;
            font-size: 30px;
            font-weight: 600;
        }
    }
}
</style>
