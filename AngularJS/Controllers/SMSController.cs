using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AngularJS.Controllers
{
    [RoutePrefix("api")]
    public class SMSController : ApiController
    {
        [Route("course/getAllCourses")]
        public List<Course> GetAllCourses()
        {
            SMSEntitiesNew db = new SMSEntitiesNew();
            return db.Courses.ToList();
        }

        [Route("course/getCourse/{id:int}")]
        public Course GetCourse(int id )
        {
            SMSEntitiesNew db = new SMSEntitiesNew();
            
            return (from c in db.Courses
                    where c.id == id
                    select c).SingleOrDefault();
        }

        [Route("course/insert")]
        public List<Course> InsertCourse(Course course)
        {
            SMSEntitiesNew db = new SMSEntitiesNew();
            db.Courses.Add(course);
            db.SaveChanges();
            return GetAllCourses();
        }

        [Route("course/delete/{id:int}")]
        public List<Course> DeleteCourse(int id)
        {
            SMSEntitiesNew db = new SMSEntitiesNew();
            var course = new Course { id = id };
            db.Courses.Attach(course);
            db.Courses.Remove(course);
            db.SaveChanges();
            return GetAllCourses();
        }

        [Route("course/update")]
        public List<Course> UpdateCourse(Course course)
        {
            SMSEntitiesNew db = new SMSEntitiesNew();
            db.Courses.Attach(course);
            db.Entry(course).State = EntityState.Modified;
            db.SaveChanges();
            return GetAllCourses();
        }

    }
}
