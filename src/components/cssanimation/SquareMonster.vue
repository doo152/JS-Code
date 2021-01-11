<template>
  <v-card color="#db4d6d" class="vcard">
      <!-- // draw the first monster on stage1 -->
    <div class="textleft"> 
      <h2 v-html="description">      
      </h2>
    </div>
    <div class="monster">
      <div class="eye">
        <div class="eyeball"></div>
      </div>
      <div class="mouth"></div>
    </div>
    
    <div class="pageloading" :class="{ complete: isActive }">
         <div class="textleft"> 
      <h2 v-html="description">      
      </h2>
    </div>
      <div class="monster">
        <div class="eye">
          <div class="eyeball"></div>
        </div>
        <div class="mouth"></div>
      </div>
      <div class="loading">
        <div class="bar" :style="{ width: computedWidth }"></div>
      </div>
    </div>
  </v-card>
</template>

   
<script>
export default {
    
    data() {
        return {
            computedWidth: 0,
            isActive: false,
            description:  `I'm a <br />Monster!`
        }
    },
  mounted() {
    var per = 0;
    var timer;
    timer = setInterval(() => {
        // $(".bar").css("width", per + "%");
        this.computedWidth = per + '%';
        // console.log("per%: ", per + '%');
        per += 1;
        if (per > 100) {
            //$(".pageloading").addClass("complete");
            this.isActive = true;
            setTimeout(() => {
                // $(".textleft").html("<h2>Hello <br> There</h2>");
                this.description = "<h2>Hello <br> There</h2>"
            });
        clearInterval(timer);
      }
    }, 50);
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.vcard {
  width: 100%;
  height: 300px;
  background-color: #db4d6d;
  display: flex;
  justify-content:center;
  align-items:center;
}
.textleft {
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
}
.monster {
  position: relative;
  width: 100px;
  height: 110px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 20px;
  background-color: #e55a54;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  animation: jumping 0.8s infinite alternate;
}

.monster .eye {
  width: 40%;
  height: 40%;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.monster .eye .eyeball {
  width: 50%;
  height: 50%;
  border-radius: 50%;
  background-color: rgb(11, 11, 105);
  animation: eyemove 1.6s infinite alternate;
}

.monster .mouth {
  width: 30%;
  height: 12px;
  margin: 12px;
  border-radius: 5px;
  background-color: #fff;
}

.monster::before,
.monster::after {
  position: absolute;
  content: "";
  display: block;
  width: 20%;
  height: 10px;
  border-radius: 10px;
  background-color: #fff;
  top: -10px;
  left: 50%;
}

.monster::before {
  transform: translateX(-70%) rotate(45deg);
}

.monster::after {
  transform: translateX(-30%) rotate(-45deg);
}

@keyframes jumping {
  50% {
    top: 0;
    box-shadow: 0 120px 20px rgba(0, 0, 0, 0.2);
  }
  100% {
    top: -50px;
    box-shadow: 0 120px 20px rgba(0, 0, 0, 0.1);
  }
}

@keyframes eyemove {
  0%,
  10% {
    transform: translateX(-50%);
  }
  90%,
  100% {
    transform: translateX(50%);
  }
}

.pageloading {
  position: fixed;
  top: 50;
  left: 0;
  width: 100%;
  height: 300px;
  background-color: #0c4475;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transition: opacity 0.5s;
}
.pageloading .loading {
  width: 200px;
  height: 8px;
  background-color: #fff;
  border-radius: 8px;
  margin-top: 50px;
  overflow: hidden;
}

.pageloading .loading .bar {
  height: 100%;
  background-color: #db4d6d;
}

.pageloading.complete {
  opacity: 0;
}

.pageloading.complete .monster {
  transition: 1s;
  transform: scale(0.1) rotateZ(360deg);
}
</style>