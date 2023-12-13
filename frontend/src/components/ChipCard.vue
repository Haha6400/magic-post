<template>
    <div class="chip-container">
        <p>
            {{ title }}: {{ content }}
        </p>
    </div>

</template>

<script>
export default {
    name: "chip",
    props: ['title', 'content'],
}
</script>

<style scoped>
.chip-container {
    background-color: #ffe4b2;
    border-radius: 30px;
    display: flex;
    width: fit-content;
    height: 40px;
}

.chip-container p {
    font-size: 12px;
    font-style: italic;
    background-color: #ffe4b2;
    border-radius: 30px;

    width: fit-content;
    height: 40px;

    margin-bottom: 0px;
    padding: 10px;

    display: flex;
    flex-direction: column;
    justify-content: center;
}


</style>