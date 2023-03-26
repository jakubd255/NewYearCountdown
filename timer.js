class Timer
{
    constructor()
    {
        this.newYear = new Date().getFullYear()+1;
        document.getElementById("title").innerHTML += ` ${this.newYear}`;

        let date = new Date();
        let newYearDate = new Date(`${this.newYear}-01-01T00:00:00`);

        let seconds = Math.round((newYearDate.getTime() - date.getTime())/1000);
        let minutes = Math.floor(seconds/60); 
        let hours = Math.floor(minutes/60);
        let days = Math.floor(hours/24);

        seconds -= minutes*60;
        minutes -= hours*60;
        hours -= days*24;
        
        this.seconds = seconds;
        this.minutes = minutes;
        this.hours = hours;
        this.days = days;
    }

    logic = () => {
        if(this.seconds < 0)
        {
            this.seconds += 60;
            this.minutes -= 1;
        }

        if(this.minutes < 0)
        {
            this.minutes += 60;
            this.hours -= 1;
        }

        if(this.hours < 0)
        {
            this.hours += 24;
            this.days -= 1;
        }

        if(this.days < 0)
        {
            document.getElementById("time-blocks").remove();
            document.getElementById("title").innerHTML = `Happy New Year ${this.newYear}`;

            tsParticles.load("tsparticles", {
                preset: "fireworks",
              });
        }
    }



    showData = () => {
        ["seconds", "minutes", "hours", "days"].map(unit => {
            if(this[unit] === 0 && unit !== "seconds")
                document.getElementById(`${unit}-parent`).style.display = "none";
            
            else
            {
                document.getElementById(unit).innerHTML = this[unit];
                document.getElementById(`${unit}-parent`).style.display = "block";
            }
        });

        if(this.days === 0 && this.hours === 0 && this.minutes === 0)
            document.getElementById("seconds-parent").classList.add("time-block-last");
    }

    count = () => {
        this.showData();
        this.seconds -= 1;
        this.logic();

        setTimeout(this.count, 1000);
    }
}



const init = () => {
    const timer = new Timer();
    timer.count();
}